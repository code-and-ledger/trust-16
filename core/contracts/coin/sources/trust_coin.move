/*
    This module defines the fungible asset structure for $trust
    
    - transfer mechanism:
    - minting mechanism: (exchange data)

    NOTE: this module is out of scope for the PoC

    TODO:
		- mint function should mint the double of the amount. make the function returns that amount. 
*/
module trust_coin::trust_coin {
    use aptos_framework::aptos_coin::{AptosCoin as APT};
    use aptos_framework::coin;
    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::event;
    use aptos_framework::function_info;
    use aptos_framework::fungible_asset::{Self, TransferRef, Metadata, FungibleAsset, FungibleStore};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::timestamp;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_std::string_utils;
    use std::option::{Self, Option};
    use std::signer;
    use std::string::{Self, String};
    use std::vector;

    // ---------
    // Constants
    // ---------

    /// denylist actions
    const ADDED: vector<u8> = b"denylisted";
    const REMOVED: vector<u8> = b"Undenylisted";
    const TRUST_NAME: vector<u8> = b"Trust Coin";
    const TRUST_SYMBOL: vector<u8> = b"TRUST";
    const ICON: vector<u8> = b"https://trust-16.com/favicon.ico";
    const PROJECT: vector<u8> = b"https://trust-16.com";
    // The seed for the mint object
    const MINT_SEED: vector<u8> = b"trust_coin::mint";
    // The seed for the withdraw object
    const WITHDRAW_SEED: vector<u8> = b"trust_coin::withdraw";

    // ------
    // Errors
    // ------

    /// The caller is not the owner of the token
    const ENOT_OWNER: u64 = 0;
    /// The coin is not burnable
    const ECOIN_NOT_BURNABLE: u64 = 1;
    /// The coin is not freezable
    const ECOIN_NOT_FREEZABLE: u64 = 2;
    /// No operations are allowed when contract is paused
    const EPAUSED: u64 = 3;
    /// Caller is not authorized to make this call
    const EUNAUTHORIZED: u64 = 4;
    /// The account is denylisted
    const EDENYLISTED: u64 = 5;
    /// Invalid time settings
    const EINVALID_TIME: u64 = 6;

    // ---------
    // Resources
    // ---------

    #[resource_group_member(group = object::ObjectGroup)]
    /// Global storage for trust coin's roles
    struct Roles has key {
        denylisters: vector<address>,
        minters: vector<address>,
        pausers: vector<address>,
        // a list of object addresses that can withdraw from a given store
        withdrawers: vector<address>,
    }

    #[resource_group_member(group = object::ObjectGroup)]
    /// Global storage for trust coin's refs
    struct Management has key {
        burn_ref: fungible_asset::BurnRef,
        mint_ref: fungible_asset::MintRef,
        transfer_ref: fungible_asset::TransferRef,
    }

    #[resource_group_member(group = object::ObjectGroup)]
    /// Global storage for trust coin's state
    struct State has key { paused: bool }

    #[resource_group_member(group = object::ObjectGroup)]
    /// Global storage for trust coin's fixed exchange <Name, ExchangeData>
    struct ExchangeRates has key {
        // default exchange rate
        default: SmartTable<String, ExchangeData>,
        // custom exchange rates for events
        limited: SmartTable<String, ExchangeData>,
    }

    #[resource_group_member(group = object::ObjectGroup)]
    /// Global storage for trust coin's exchange data
    struct ExchangeData has key, store {
        coin_metadata: Object<Metadata>,
        coin_amount: u64,
        trust_amount_to_receive: u64,
        start_time: Option<u64>,
        end_time: Option<u64>,
    }

    /// Resource that is used to allow an account to use the deposit function
    struct AllowDeposit has key {}

    /// Resource that is used to allow an account to use the withdraw function
    struct AllowWithdraw has key {}

    // ------
    // Events
    // ------

    #[event]
    struct Burned has drop, store {
        coin_address: address,
        burner: address,
        from: address,
        amount: u64,
    }

    #[event]
    struct Minted has drop, store {
        coin_address: address,
        minter: address,
        to: address,
        amount: u64,
    }

    #[event]
    struct Paused has drop, store {
        pauser: address,
        is_paused: bool,
    }

    #[event]
    struct DenylistUpdated has drop, store {
        denylister: address,
        account: address,
        action: String,
    }

    #[event]
    struct CoinsBurned has drop, store { cointype: String, amount: u64 }

    #[event]
    struct CoinsFrozen has drop, store { cointype: String, amount: u64 }

    #[event]
    struct ExchangeAdded has drop, store {
        coin_metadata: Object<Metadata>,
        coin_amount: u64,
        trust_amount_to_receive: u64,
        start_time: Option<u64>,
        end_time: Option<u64>,
    }

    // ----------------
    // Assert Functions
    // ----------------

    /// Assert the caller is the minter of the token
    public fun assert_minter(signer_ref: &signer) acquires Roles {
        let signer_addr = signer::address_of(signer_ref);
        let roles = borrow_global<Roles>(coin_address());
        assert!(vector::contains(&roles.minters, &signer_addr), EUNAUTHORIZED);
    }

    /// Assert the address is the owner of the token
    public fun assert_owner(metadata: Object<Metadata>, addr: address) {
        assert!(object::is_owner<Metadata>(metadata, addr), ENOT_OWNER);
    }

    public fun assert_pauser(signer_ref: &signer) acquires Roles {
        let signer_addr = signer::address_of(signer_ref);
        let roles = borrow_global<Roles>(coin_address());
        assert!(vector::contains(&roles.pausers, &signer_addr), EUNAUTHORIZED);
    }

    public fun assert_denylister(signer_ref: &signer) acquires Roles {
        let signer_addr = signer::address_of(signer_ref);
        let roles = borrow_global<Roles>(coin_address());
        assert!(vector::contains(&roles.denylisters, &signer_addr), EUNAUTHORIZED);
    }

    public fun assert_not_paused() acquires State {
        let state = borrow_global<State>(coin_address());
        assert!(!state.paused, EPAUSED);
    }

    public fun assert_allowlisted(account: address) {
        let metadata = metadata();
        if (primary_fungible_store::primary_store_exists(account, metadata)) {
            assert!(fungible_asset::is_frozen(primary_fungible_store::primary_store(account, metadata)), EDENYLISTED);
        }
    }

    // public fun assert_deposit_allowed(account: address) {
    //     let metadata = metadata();
    //     assert!(exists<AllowDeposit>(primary_fungible_store::primary_store(account, metadata)), EUNAUTHORIZED);
    // }

    // public fun assert_withdraw_allowed(account: address) {
    //     let metadata = metadata();
    //     assert!(exists<AllowDeposit>(primary_fungible_store::primary_store(account, metadata)), EUNAUTHORIZED);
    // }

    public fun assert_withdrawer(signer_ref: &signer) acquires Roles {
        let signer_addr = signer::address_of(signer_ref);
        let roles = borrow_global<Roles>(coin_address());
        assert!(vector::contains(&roles.withdrawers, &signer_addr), EUNAUTHORIZED);
    }

    /// Initializer function
    fun init_module(deployer: &signer) {
        // assert!(signer::address_of(deployer) == @dev, 0xc1);
        // Create the coin with primary store support.
        let constructor_ref = &object::create_named_object(deployer, TRUST_SYMBOL);
        primary_fungible_store::create_primary_store_enabled_fungible_asset(
            constructor_ref,
            option::none(),
            string::utf8(TRUST_NAME),
            string::utf8(TRUST_SYMBOL),
            8,
            string::utf8(ICON),
            string::utf8(PROJECT),
        );

        // Set ALL stores for the fungible asset to untransferable.
        fungible_asset::set_untransferable(constructor_ref);

        // All resources created will be kept in the asset metadata object.
        let obj_signer_ref = &object::generate_signer(constructor_ref);
        move_to(obj_signer_ref, Roles {
            denylisters: vector[@dev],
            minters: vector[@dev],
            pausers: vector[@dev],
            withdrawers: vector[@dev],
        });

        // Create mint/burn/transfer refs to allow creator to manage the coin.
        move_to(obj_signer_ref, Management {
            burn_ref: fungible_asset::generate_burn_ref(constructor_ref),
            mint_ref: fungible_asset::generate_mint_ref(constructor_ref),
            transfer_ref: fungible_asset::generate_transfer_ref(constructor_ref),
        });

        move_to(obj_signer_ref, State { paused: false });

        // initiate the default exchange table
        let default = smart_table::new<String, ExchangeData>();
        // initiate the limited exchange table
        let limited = smart_table::new<String, ExchangeData>();

        move_to(obj_signer_ref, ExchangeRates { default, limited });
        

        let withdraw = function_info::new_function_info(
            deployer,
            string::utf8(b"trust_coin"),
            string::utf8(b"withdraw"),
        );

        dispatchable_fungible_asset::register_dispatch_functions(
            constructor_ref,
            option::some(withdraw),
            option::none(),
            option::none(),
        );
    }

    /// Withdraw function override to impose requirements on the account
    /// Callable only by admins or allowed accounts
    public fun withdraw<T: key>(
        store: Object<T>,
        amount: u64,
        transfer_ref: &TransferRef,
    ): FungibleAsset acquires State {
        assert_not_paused();
        // check if the account has primary store for the fa, if not create one
        primary_fungible_store::ensure_primary_store_exists(object::owner(store), metadata());
        assert_allowlisted(object::owner(store));
        // Withdraw the amount from the input store and return it.
        let fa = fungible_asset::withdraw_with_ref(transfer_ref, store, amount);
        // freeze the store, disallowing direct transfers
        fungible_asset::set_frozen_flag(transfer_ref, store, true);
        
        fa
    }

    /// Mint new assets to the specified account.
    /// TODO: should take key instead of amount
    /// TODO: This should be in router module in order to be able to use both trust_coin and rewards_pool modules
    public entry fun mint(minter: &signer, to: address, /*exchange_key: String*/ amount: u64) acquires Management, Roles {
        assert_minter(minter);
        let management = borrow_global<Management>(coin_address());
        let fa_to_minter = fungible_asset::mint(&management.mint_ref, amount);
        // let fa_to_rewards_pool = fungible_asset::mint(&management.mint_ref, amount);
        // let rewards_pool_addr = object::create_object_address(&@trust_coin, WITHDRAW_SEED);
        fungible_asset::deposit_with_ref(&management.transfer_ref, primary_fungible_store::ensure_primary_store_exists(to, metadata()), fa_to_minter);
        // fungible_asset::deposit_with_ref(&management.transfer_ref, primary_fungible_store::primary_store(rewards_pool_addr, metadata()), fa_to_rewards_pool);

        event::emit(Minted {
            coin_address: coin_address(),
            minter: signer::address_of(minter),
            to,
            amount,
        });

        // TODO: add events for rewards pool
    }

    /// Burn assets from the specified account.
    public entry fun burn(obj_signer_ref: &signer, from: address, amount: u64) acquires Management, State {
        // Withdraw the assets from the account and burn them.
        let management = borrow_global<Management>(coin_address());
        let assets = withdraw<FungibleStore>(
            primary_fungible_store::ensure_primary_store_exists(from, metadata()), 
            amount, 
            &management.transfer_ref
        );
        fungible_asset::burn(&management.burn_ref, assets);

        event::emit(Burned {
            coin_address: coin_address(),
            burner: signer::address_of(obj_signer_ref),
            from,
            amount,
        });
    }

    /// Add an account to the denylist. This checks that the caller is the denylister.
    public entry fun admin_add_to_denylist(denylister: &signer, account: address) acquires Management, Roles, State {
        let fa_address = object::object_address<Metadata>(&metadata());
        assert_not_paused();
        assert_denylister(denylister);

        let freeze_ref = &borrow_global<Management>(fa_address).transfer_ref;
        primary_fungible_store::set_frozen_flag(freeze_ref, account, true);

        event::emit(
            DenylistUpdated {
                denylister: signer::address_of(denylister),
                account,
                action: string::utf8(ADDED)
            }
        );
    }

    /// Add all accounts in the given list to the denylist. This checks that the caller is the denylister.
    public entry fun admin_add_all_to_denylist(denylister: &signer, accounts: vector<address>) acquires Management, Roles, State {
        for (i in 0..vector::length(&accounts)) {
            admin_add_to_denylist(denylister, *vector::borrow(&accounts, i));
        }
    }

    /// Remove an account from the denylist. This checks that the caller is the denylister.
    public entry fun admin_remove_from_denylist(denylister: &signer, account: address) acquires Management, Roles, State {
        let fa_address = coin_address();
        assert_not_paused();
        assert_denylister(denylister);

        let freeze_ref = &borrow_global<Management>(fa_address).transfer_ref;
        primary_fungible_store::set_frozen_flag(freeze_ref, account, false);

        event::emit(DenylistUpdated {
            denylister: signer::address_of(denylister),
            account,
            action: string::utf8(REMOVED)
        });
    }

    /// Remove all accounts in the given list from the denylist. This checks that the caller is the denylister.
    public entry fun admin_remove_all_from_denylist(denylister: &signer, accounts: vector<address>) acquires Management, Roles, State {
        for (i in 0..vector::length(&accounts)) {
            admin_remove_from_denylist(denylister, *vector::borrow(&accounts, i));
        }
    }

    // -----------------
    // Mutator Functions
    // -----------------

    /// Add a new limited exchange entry to the exchange table
    /// Callable only by the owner of the token only
    public entry fun admin_add_limited_exchange_entry(
        signer_ref: &signer,
        coin_metadata: Object<Metadata>,
        coin_amount: u64,
        trust_amount_to_receive: u64,
        maybe_start_time: u64,
        maybe_end_time: u64,
    ) acquires ExchangeRates {
        assert_owner(coin_metadata, signer::address_of(signer_ref));
        let exchange_rates = borrow_global_mut<ExchangeRates>(coin_address());
        add_exchange_entry_internal(
            &mut exchange_rates.limited,
            coin_metadata,
            coin_amount,
            trust_amount_to_receive,
            option::some(maybe_start_time),
            option::some(maybe_end_time),
        );
    }

    /// Add a new default exchange entry to the exchange table
    /// Callable only by the owner of the token only
    public entry fun admin_add_default_exchange_entry(
        signer_ref: &signer,
        coin_metadata: Object<Metadata>,
        coin_amount: u64,
        trust_amount_to_receive: u64,
        maybe_start_time: u64,
        maybe_end_time: u64,
    ) acquires ExchangeRates {
        assert_owner(coin_metadata, signer::address_of(signer_ref));
        let exchange_rates = borrow_global_mut<ExchangeRates>(coin_address());
        add_exchange_entry_internal(
            &mut exchange_rates.default,
            coin_metadata,
            coin_amount,
            trust_amount_to_receive,
            option::some(maybe_start_time),
            option::some(maybe_end_time),
        );
    }

    /// TODO: Remove an exchange entry from the exchange table

    /// TODO: Add a denylister to the denylisters list
    
    /// TODO: Add a minter to the minters list

    /// TODO: Add a pauser to the pausers list

    /// TODO: Add a withdrawer to the withdrawers list

    /// TODO: Remove a denylister from the denylisters list

    /// TODO: Remove a minter from the minters list

    /// TODO: Remove a pauser from the pausers list

    /// TODO: Remove a withdrawer from the withdrawers list

    /// TODO: Pause the contract

    /// TODO: Unpause the contract

    // ----------------
    // Helper Functions
    // ----------------

    /// Internal function to add a new exchange entry to the exchange table
    /// name should be: "coin_amount + coin_symbol => trust_amount_to_receive"
    inline fun add_exchange_entry_internal(
        exchange_table_mut_ref: &mut SmartTable<String, ExchangeData>,
        coin_metadata: Object<Metadata>,
        coin_amount: u64,
        trust_amount_to_receive: u64,
        maybe_start_time: Option<u64>,
        maybe_end_time: Option<u64>,
    ) {
        if (option::is_some(&maybe_start_time) && option::is_some(&maybe_end_time)) {
            // assert now <= start_time < end_time
            let start_time = *option::borrow(&maybe_start_time);
            let end_time = *option::borrow(&maybe_end_time);
            assert!(timestamp::now_seconds() <= start_time, EINVALID_TIME);
            assert!(start_time < end_time, EINVALID_TIME);
        };
        // prepare the exchange name
        let name = string::utf8(b"");
        string::append(&mut name, string_utils::to_string<u64>(&coin_amount));
        string::append(&mut name, fungible_asset::symbol(coin_metadata));
        string::append(&mut name, string_utils::to_string<u64>(&trust_amount_to_receive));

        let exchange_data = ExchangeData {
            coin_metadata,
            coin_amount,
            trust_amount_to_receive,
            start_time: maybe_start_time,
            end_time: maybe_end_time,
        };

        smart_table::add(exchange_table_mut_ref, name, exchange_data);

        event::emit(ExchangeAdded {
            coin_metadata,
            coin_amount,
            trust_amount_to_receive,
            start_time: maybe_start_time,
            end_time: maybe_end_time,
        });
    }

    /// Internal function to get the metadata of aptos coin
    fun apt_metadata(): Object<Metadata> {
        let paired_metadata_opt = coin::paired_metadata<APT>();
        option::extract<Object<fungible_asset::Metadata>>(&mut paired_metadata_opt)
    }

    /// Helper function to get the withraw seed
    public fun withdraw_seed(): vector<u8> {
        WITHDRAW_SEED
    }

    /// Helper function to allow direct transfer of a given account
    fun allow_direct_transfer<T: key>(signer_ref: &signer, store: Object<T>) acquires Management, Roles {
        // ensure signer is authorized to make this call
        assert_withdrawer(signer_ref);
        let management = borrow_global<Management>(coin_address());
        fungible_asset::set_frozen_flag<T>(&management.transfer_ref, store, false);
    }

    // --------------
    // View Functions
    // --------------

    #[view]
    /// Returns the address of trust coin
    public fun coin_address(): address {
        object::create_object_address(&@dev, TRUST_SYMBOL)
    }

    #[view]
    /// Returns the metadata of trust coin
    public fun metadata(): Object<Metadata> {
        object::address_to_object(coin_address())
    }

    #[view]
    /// Returns the address of the mint object
    public fun mint_obj_addr(): address {
        object::create_object_address(&@trust_coin, MINT_SEED)
    }

    #[view]
    /// Returns the address of the withdraw object
    public fun withdraw_obj_addr(): address {
        object::create_object_address(&@trust_coin, WITHDRAW_SEED)
    }
    
    // ---------
    // Unit test
    // ---------

    #[test_only]
    public fun init_for_test(deployer: &signer) {
        init_module(deployer);
    }
}
