/*
    This module defines the core mechanics of the cooperate bail game

    can be used for 2 players or more

    lifecycle for 2 players:
    1. prepare_game: 
        - creates a session for the players
        - creates a game for matchmaking:
            - set 
        


    TODO: 
        - 
*/

module trust_16::mechanics {
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore, Metadata};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use std::signer;
    use std::vector;
    use trust_16::match;
    use trust_16::trust_coin;

    // ------
    // Errors
    // ------

    /// The length of the input vector is not as expected
    const ELENGTH_MISMATCH: u64 = 1;

    // ---------
    // Resources
    // ---------

    /// Global storage for the game data
    struct GameInfo has key {
        rounds_count: u64,
        rounds: vector<Round>,
        // initial balances of the players as well as the rewards pool
        initial_balances: SmartTable<address, u64>,
        // balances of the players and the rewards pool after each round
        balances_tracker: SmartTable<address, u64>,
        // the rewards pool that holds the deposits of the players as well as the universal rewards
        pool: Object<FungibleStore>,
        decisions: SmartTable<address, bool>
    }

    /// Global storage for the round data
    struct Round has key, store {
        start_time: u64, // in seconds
        duration: u64, // in seconds
        // key is the player's address and value is the decision; true for cooperate, false for compete
        encrypted_decisions: SmartTable<address, vector<u8>>
    }

    // ------
    // Events
    // ------

    // -------
    // Asserts
    // -------

    // ---------------
    // Entry Functions
    // ---------------

    /// Creates the game for matchmaking
    public(friend) fun prepare_game(
        players: vector<address>,
        rounds_count: u64,
        duration: vector<u64>,
        total_deposit_amount_per_player: u64
    ) {
        let session_id = match::create_session(players);
        let session_signer_ref = &match::session_signer(session_id);
        // ensure the length of the duration vector is as expected
        assert!(vector::length(&duration) == rounds_count, ELENGTH_MISMATCH);
        // create the rounds
        let rounds = vector::empty<Round>();
        for (i in 0..rounds_count) {
            vector::push_back(
                &mut rounds,
                Round {
                    start_time: timestamp::now_seconds(),
                    duration: *vector::borrow(&duration, i),
                    encrypted_decisions: smart_table::new<address, vector<u8>>()
                }
            )
        };
        let obj_constructor = object::create_object(session_id);
        move_to(
            session_signer_ref,
            GameInfo {
                rounds_count,
                rounds,
                initial_balances: smart_table::new<address, u64>(),
                balances_tracker: smart_table::new<address, u64>(),
                pool: fungible_asset::create_store<Metadata>(&obj_constructor, trust_coin::metadata()),
                decisions: smart_table::new<address, bool>()
            }
        );

        // Emit event
    }

    /// Join the game
    public(friend) fun join_game(
        signer_ref: &signer,
        session_id: address,
    ) {
        let signer_addr = signer::address_of(signer_ref);
        // ensure the session exists
        match::assert_session_valid(session_id);
        // ensure the player address is in the session
        match::assert_player_in_session(vector[signer_addr], session_id);
        // ensure the player has not joined the game yet

        
    }

    public(friend) fun finish_game(session_id: address){
        // TODO: 
        // end session
        match::end_session(session_id);
    }

    public(friend) fun pre_round(){}

    public(friend) fun submit_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ){}

    public(friend) fun post_round(){}

    /// Gets the desicions of the players as input and proceed with the defined scenarios
    /// In case of more than two players, the majority wins.
    public(friend) fun admin_proceed(
        signer_ref: &signer,
        session_id: address,
        hash_key: vector<u8>,
        hashed_decisions: vector<vector<u8>>,
        bail_amount: u64
    ) {
        
    }
    

    // ------------------
    // Internal Functions
    // ------------------

    /// Helper function to proceed with the game decisions
    fun proceed(
        session_id: address,
        hash_key: vector<u8>,
        hashed_decisions: vector<vector<u8>>,
        bail_amount: u64
    ) {

    }

    // ----------
    // Unit tests
    // ----------
}