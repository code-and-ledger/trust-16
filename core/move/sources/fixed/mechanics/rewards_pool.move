/*
    This module defines the rewards pool data structure.

    The rewards pool is a universal pool that stores funds resulted from:
    - dual mint purchases
    - cooperate-compete rounds
    - power-ups
*/

module trust_16::rewards_pool {

    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore, Metadata};
    use std::object::{Self, Object};
    use std::signer;
    use trust_16::trust_coin;

    friend trust_16::mechanics;
    friend trust_16::router;

    // ---------
    // Constants
    // ---------

    // ------
    // Errors
    // ------

    // ---------
    // Resources
    // ---------

    /// Global storage for the rewards pool
    struct Info has key {
        admin_addr: address,
        store: Object<FungibleStore>,
        // used for the withdraws
        extend_ref: object::ExtendRef,
    }

    // ------
    // Events
    // ------



    // --------------------
    // Initializer Function
    // --------------------

    /// Initializes the info resource; callable by the time of deployment
    public(friend) fun init(obj_signer: &signer) {
        trust_coin::assert_withdrawer(obj_signer);
        let obj_addr = signer::address_of(obj_signer);
        let obj_constructor = object::create_object(obj_addr);
        let trust_coin_metadata = trust_coin::metadata();
        move_to(
            obj_signer,
            Info { 
                admin_addr: obj_addr,
                store: fungible_asset::create_store<Metadata>(&obj_constructor, trust_coin_metadata), 
                extend_ref: object::generate_extend_ref(&obj_constructor)
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
    public(friend) fun deposit(fa: FungibleAsset) acquires Info {
        let info = borrow_global<Info>(@trust_16);
        dispatchable_fungible_asset::deposit(info.store, fa);
    }

    /// Withdraws the amount from the rewards pool
    public(friend) fun withdraw(amount: u64): FungibleAsset acquires Info {
        let info = borrow_global<Info>(@trust_16);
        let signer_ref = &object::generate_signer_for_extending(&info.extend_ref);
        dispatchable_fungible_asset::withdraw(signer_ref, info.store, amount)
    }

    /// Returns the object of the rewards pool store
    public fun pool_store_object(): Object<FungibleStore> acquires Info {
        let info = borrow_global<Info>(@trust_16);
        info.store
    }

    /// Returns the address of the rewards pool store
    public fun pool_address(): address acquires Info {
        let info = borrow_global<Info>(@trust_16);
        object::object_address(&info.store)
    }
}