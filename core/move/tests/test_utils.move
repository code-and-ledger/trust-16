/*
    TODO:
        - Initialize session manager account
*/
#[test_only]
module trust_16::test_utils {

    use aptos_framework::account;
    use aptos_framework::aptos_coin::{Self, AptosCoin as APT};
    use aptos_framework::coin;
    // use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::fungible_asset::{Self, Metadata};
    use aptos_framework::genesis;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::object::Object;
    use aptos_framework::timestamp;

    use aptos_std::debug;

    use std::option;
    use std::signer;

    use trust_16::rewards_pool;
    use trust_16::trust_coin;
    use trust_16::session;

    const AMOUNT: u64 = 1_000_00000000; // 1000 APT

    public fun setup_test(aptos_framework: &signer, trust_16: &signer, session_manager: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        
        // init accounts
        account::create_account_for_test(signer::address_of(aptos_framework));
        account::create_account_for_test(signer::address_of(trust_16));
        account::create_account_for_test(signer::address_of(session_manager));
        account::create_account_for_test(signer::address_of(alice));
        account::create_account_for_test(signer::address_of(bob));
        account::create_account_for_test(signer::address_of(charlie));

        // mint APT for accounts
        let apt_to_alice = aptos_coin::mint_apt_fa_for_test(AMOUNT);
        let apt_to_bob = aptos_coin::mint_apt_fa_for_test(AMOUNT);
        let apt_to_charlie = aptos_coin::mint_apt_fa_for_test(AMOUNT);
        primary_fungible_store::deposit(signer::address_of(alice), apt_to_alice);
        primary_fungible_store::deposit(signer::address_of(bob), apt_to_bob);
        primary_fungible_store::deposit(signer::address_of(charlie), apt_to_charlie);

        // create apt store for trust_16
        primary_fungible_store::ensure_primary_store_exists(signer::address_of(trust_16), apt_metadata());

        // init modules
        trust_coin::init_for_test(trust_16);
        rewards_pool::init(trust_16);
        session::init_for_test(trust_16);
        timestamp::set_time_has_started_for_testing(aptos_framework);

        // mint TRUST for accounts
        trust_coin::mint(trust_16, signer::address_of(alice), AMOUNT);
        trust_coin::mint(trust_16, signer::address_of(bob), AMOUNT);
        trust_coin::mint(trust_16, signer::address_of(charlie), AMOUNT);
    }

    public fun apt_metadata(): Object<Metadata> {
        let paired_metadata_opt = coin::paired_metadata<APT>();
        option::extract<Object<fungible_asset::Metadata>>(&mut paired_metadata_opt)
    }

    public fun setup_test_with_genesis(aptos_framework: &signer, trust_16: &signer, session_manager: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        genesis::setup();
        setup_test(aptos_framework, trust_16, session_manager, alice, bob, charlie);
    }
}