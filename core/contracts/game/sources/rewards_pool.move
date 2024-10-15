/*
    This module defines the rewards pool data structure.

    The rewards pool is a universal pool that stores funds resulted from:
    - dual mint purchases
    - cooperate-compete rounds
    - power-ups

    NOTE: This module is out of scope for the PoC

    TODO:
        - support will be added in the future for the rewards pool
*/

module trust_16::rewards_pool {

    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore, Metadata};
    use aptos_framework::primary_fungible_store;
    use std::object::{Self, Object};
    use trust_coin::trust_coin;

    friend trust_16::admin;
    friend trust_16::mechanics;
    friend trust_16::router;

    // ---------
    // Resources
    // ---------

    /// Global storage for the rewards pool
    struct Info has key {
        store: Object<FungibleStore>,
        // used for the withdraws
        extend_ref: object::ExtendRef
    }
    
    // --------------------
    // Initializer Function
    // --------------------

    /// Initializes the info resource; callable by the time of deployment
    public(friend) fun init(deployer: &signer) {
        let trust_coin_metadata = trust_coin::metadata();
        let withdraw_constructor_ref = &object::create_named_object(deployer, trust_coin::withdraw_seed());
        move_to(
            deployer,
            Info { 
                store: fungible_asset::create_store<Metadata>(withdraw_constructor_ref, trust_coin_metadata), 
                extend_ref: object::generate_extend_ref(withdraw_constructor_ref)
            }  
        );
    }

    // ----------------
    // Public Functions
    // ----------------

    /// Returns the signer for the pool
    public(friend) fun pool_signer(): signer acquires Info {
        let info = borrow_global<Info>(@trust_16);
        object::generate_signer_for_extending(&info.extend_ref)
    }

    /// Deposits the amount to the rewards pool
    public(friend) fun deposit(amount: u64, from: address) acquires Info {
        let info = borrow_global<Info>(@trust_16);
        let withdrawer_signer_ref = &object::generate_signer_for_extending(&info.extend_ref);
        let from_primary_store = primary_fungible_store::primary_store(from, trust_coin::metadata());
        let fa = dispatchable_fungible_asset::withdraw(withdrawer_signer_ref, from_primary_store, amount);
        dispatchable_fungible_asset::deposit(info.store, fa);
    }

    /// Withdraws the amount from the rewards pool
    public(friend) fun withdraw(amount: u64): FungibleAsset acquires Info {
        let info = borrow_global<Info>(@trust_16);
        let withdrawer_signer_ref = &object::generate_signer_for_extending(&info.extend_ref);
        dispatchable_fungible_asset::withdraw(withdrawer_signer_ref, info.store, amount)
    }

    // --------------
    // View Functions
    // --------------

    #[view]
    /// Returns the object of the rewards pool store
    public fun pool_store_object(): Object<FungibleStore> acquires Info {
        let info = borrow_global<Info>(@trust_16);
        info.store
    }

    #[view]
    /// Returns the address of the rewards pool store
    public fun pool_address(): address acquires Info {
        let info = borrow_global<Info>(@trust_16);
        object::object_address(&info.store)
    }

    // ---------
    // Unit Test
    // ---------

    #[test_only]
    friend trust_16::test_utils;
}