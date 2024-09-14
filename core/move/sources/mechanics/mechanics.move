/*
    This module defines the core mechanics of the cooperate bail game

    can be used for 2 players or more

    lifecycle for 2 players:
    1. prepare_game: 
        - creates a session for the players
        - creates a game for matchmaking:
            - set 
        


    TODO: 
        - finish description
        - add events
        - No asserts in internal functions
*/

module trust_16::mechanics {
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore, Metadata};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_std::simple_map::SimpleMap;
    use std::event;
    use std::option;
    use std::signer;
    use std::vector;
    use trust_16::match;
    use trust_16::rewards_pool;
    use trust_16::trust_coin;

    // ------
    // Errors
    // ------

    /// The length of the input vector is not as expected
    const ELENGTH_MISMATCH: u64 = 1;
    /// The round index is invalid
    const EROUND_INVALID: u64 = 2;

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
    }

    /// Global storage for the round data
    struct Round has key, store {
        start_time: u64, // in seconds
        duration: u64, // in seconds
        // key is the player's address and value is the decision; true for cooperate, false for compete
        decisions: SmartTable<address, HashedDecision>,
        // in-round balances tracker
        balances_tracker: SmartTable<address, u64>,
    }

    /// A reusable resource that st the hashed decisions
    /// Stored under the player's account
    struct HashedDecision has copy, key, store {
        hash_key: option::Option<vector<u8>>,
        hashed_decisions: vector<vector<u8>>
    }

    // ------
    // Events
    // ------

    #[event]
    struct DescisionSubmitted has drop, store {
        player: address,
        round_index: u64,
        decision: vector<u8>,
        is_first_in_round: bool,
        is_last_in_round: bool,
    }

    // -------
    // Asserts
    // -------

    // /// Ensure round is valid: 
    // /// - given round index is equal to the current round index
    // /// - the current time is within the round duration
    // public fun assert_round_valid(session_id: address, round_index: u64) acquires GameInfo {
    //     let game_info = borrow_global<GameInfo>(session_id);
    //     let rounds = &game_info.rounds;
    //     let round_time = current_round_start_time(session_id);
    //     let round_duration = current_round_duration(session_id);
    //     let current_time = timestamp::now_seconds();
    //     // index check
    //     assert!(round_index == current_round_index(session_id), EROUND_INVALID);
    //     // time check
    //     assert!(current_time >= round_time && current_time <= round_time + round_duration, EROUND_INVALID);
    // }

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
                    decisions: smart_table::new<address, HashedDecision>(),
                    balances_tracker: smart_table::new<address, u64>(),
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
        match::assert_player_registered_in_session(signer_addr, session_id);
        // TODO: ensure the player has not joined the game yet / overriden by assert_players_eligibility ?
        // TODO: deposit the amount needed to play the game
        // add the player to the session by creating a badge and move it to the player's address
        match::add_badge_to_player(signer_ref, session_id);
    }

    public(friend) fun finish_game(session_id: address){
        // TODO: ensure the current round is the last round
        // TODO: ensure the current round is finished
        // TODO: distribute the rewards
        // end session
        match::end_session(session_id);
    }

    public(friend) fun submit_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        if (current_round_index(session_id) == 0) {
            submit_first_decision(signer_ref, session_id, round_index, decision);
            event::emit(DescisionSubmitted {
                player: signer::address_of(signer_ref),
                round_index,
                decision,
                is_first_in_round: true,
                is_last_in_round: false,
            });
        } else if (current_round_index(session_id) == rounds_count(session_id) ) {
            submit_last_decision(signer_ref, session_id, round_index, decision);
            event::emit(DescisionSubmitted {
                player: signer::address_of(signer_ref),
                round_index,
                decision,
                is_first_in_round: false,
                is_last_in_round: true,
            });
        } else {
            submit_decision_internal(signer_ref, session_id, round_index, decision);
            event::emit(DescisionSubmitted {
                player: signer::address_of(signer_ref),
                round_index,
                decision,
                is_first_in_round: false,
                is_last_in_round: false,
            });
        }
    }

    /// Triggered by the player to submit their decision
    /// Triggered when decisions.len + 1 < decisions.len
    fun submit_decision_internal(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        let signer_addr = signer::address_of(signer_ref);
        // session checks
        match::assert_session_valid(session_id);
        match::assert_player_active_in_session(vector[signer_addr], session_id);
        // round checks 

        assert!(is_active(session_id, round_index), EROUND_INVALID);
        assert!(round_index == current_round_index(session_id), EROUND_INVALID);

        // TODO: store the decision
        // TODO: update the balances tracker
    }

    /// Submit the first decision of the round
    /// Triggered by the first player submitting their decision
    /// Triggered when decisions.len == 0
    public(friend) fun submit_first_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    )  {
        // ensure decisions.len == 0 from the round resource
    }
        
    /// Submit the last decision of the round
    /// Triggered by the last player submitting their decision
    /// Triggered when decisions.len + 1 == decisions.len
    public(friend) fun submit_last_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        
        // TODO: ensure the player did not submit a decision yet (check decisions table)
        // submit the decision
        submit_decision_internal(signer_ref, session_id, round_index, decision);
        // increment round counter; No need as we're querying the current round index from rounds length
    }

    /// TODO: Reveal decisions and update balances_tracker
    /// Triggered when submit_last_decision is called
    /// 1. add hash_key to the HashedDecision resource
    /// 2. update in-round balances tracker
    /// 3. update the balances tracker from game info
    
    /// TODO: Finish the game and distribute the rewards
    /// Triggered when the last round is finished
    

    // ------------------
    // Internal Functions
    // ------------------

    /// Helper function to get the number of rounds in the game given a session id
    inline fun rounds_count(session_id: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        game_info.rounds_count
    }
    
    /// Helper function to access a round resource at a given index
    inline fun borrow_round(session_id: address, round_index: u64): &Round acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        let rounds = &game_info.rounds;
        vector::borrow(rounds, round_index)
    }

    /// Helper function to mutuably access a round resource at a given index
    inline fun borrow_round_mut(session_id: address, round_index: u64): &mut Round acquires GameInfo {
        let game_info = borrow_global_mut<GameInfo>(session_id);
        let rounds = &mut game_info.rounds;
        vector::borrow_mut(rounds, round_index)
    }

    /// Helper function to get the current round index
    inline fun current_round_index(session_id: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        vector::length(&game_info.rounds) - 1
    }

    /// Helper function to get the start time of a round at a given index
    fun round_start_time(session_id: address, round_index: u64): u64 acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        round.start_time
    }

    /// Helper function to get the duration of a round at a given index
    fun round_duration(session_id: address, round_index: u64): u64 acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        round.duration
    }

    /// Helper function to get the decisions of a round at a given index
    fun round_hashed_decisions(session_id: address, round_index: u64): SimpleMap<address, HashedDecision> acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        smart_table::to_simple_map(&round.decisions)
    }

    /// Helper function to get the balances tracker of a round at a given index
    fun round_balances_tracker(session_id: address, round_index: u64): SimpleMap<address, u64> acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        smart_table::to_simple_map(&round.balances_tracker)
    }

    /// Helper function to calculate the round deposit amount per player
    /// initial_balances[player] / rounds_count (can query at index 1 or up, since index 0 is the balance from universal reward pool)
    fun round_deposit_amount(session_id: address, player_addr: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        *smart_table::borrow(&game_info.initial_balances, player_addr)
    }

    /// Helper function to calculate the round deposit amount from the universal reward pool
    /// should be equal to the total total_deposit_amounts from players
    fun round_rewards_pool_deposit_amount(session_id: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        let rewards_pool_deposit = *smart_table::borrow(&game_info.initial_balances, rewards_pool::pool_address());
        (rewards_pool_deposit / rounds_count(session_id))
    }

    /// Helper function to check whether the round is active
    /// active if the current time is within the round duration
    fun is_active(session_id: address, round_index: u64): bool acquires GameInfo {
        timestamp::now_seconds() < (round_start_time(session_id, round_index) + round_duration(session_id, round_index))
    }

    // ----------
    // Unit tests
    // ----------
}