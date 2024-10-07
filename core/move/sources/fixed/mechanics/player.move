/*
    This module defines the data strcuture for a player

    The structure is defined as follows:
    - address: the address to the wallet of the player
    - decisions ledger: a vector of x last decisions made by the player
    - a metric (reputation by the time of writing) that is used to determine the player's eligibility to play a game

    TODO: 
        - Work on the metric mentioned in as reputation
        - Add consumables that when used, can see x*2 previous decisions of opponents
*/

module trust_16::player {
    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::event;
    use aptos_framework::fungible_asset::{Self, Metadata, FungibleAsset};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::smart_vector::{Self, SmartVector};
    use aptos_framework::timestamp;
    use aptos_std::option::{Self, Option};
    use std::signer;
    use std::vector;

    // ---------
    // Constants
    // ---------



    // ------
    // Errors
    // ------

    /// The player already exists
    const EPLAYER_EXISTS: u64 = 1;

    // ---------
    // Resources
    // ---------

    struct Player has key {
        id: address,
        // true for cooperate, false for compete
        decisions_ledger: SmartVector<bool>,
    }

    // ------
    // Events
    // ------

    #[event]
    struct PlayerCreated has drop, store {
        player_id: address
    }

    // ----------------
    // Assert Functions
    // ----------------

    /// Assert that the player exists
    public fun assert_player_exists(player_id: address) {
        assert!(exists<Player>(player_id), EPLAYER_EXISTS);
    }

    // ----------------
    // Public Functions
    // ----------------

    /// Create a new player
    public(friend) fun create_player(signer_ref: &signer) {
        let signer_addr = signer::address_of(signer_ref);
        assert_player_exists(signer_addr);
        move_to(
            signer_ref,
            Player {
                id: signer_addr,
                decisions_ledger: smart_vector::new<bool>(),
            }
        );
        event::emit(PlayerCreated { player_id: signer_addr });
    }

    /// Add a decision to the player's ledger
    public(friend) fun add_decision(signer_ref: &signer, decision: bool) acquires Player {
        assert_player_exists(signer::address_of(signer_ref));
        let player = borrow_global_mut<Player>(signer::address_of(signer_ref));
        smart_vector::push_back(&mut player.decisions_ledger, decision);
    }

    /// Returns the player's x decisions from the decision ledger
    public(friend) fun last_x_decisions(player_id: address, x: u64): vector<bool> acquires Player {
        assert_player_exists(player_id);
        let player = borrow_global<Player>(player_id);
        // let decision_ledger_len = smart_vector::length(&player.decisions_ledger);
        let decision_ledger = smart_vector::to_vector(&player.decisions_ledger);
        vector::reverse(&mut decision_ledger);
        // get the last x decisions
        vector::slice(&decision_ledger, 0, x)
    }

    // ----------------
    // Helper Functions
    // ----------------



    // --------------
    // View Functions
    // --------------

    // ---------
    // Unit Test
    // ---------

}

