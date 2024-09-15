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
        - discuss: round starts when the first decision is submitted (ease of implementation)
*/

module trust_16::mechanics {
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore, Metadata};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_std::simple_map::{Self, SimpleMap};
    use std::event;
    use std::option;
    use std::signer;
    use std::vector;
    use trust_16::session;
    use trust_16::rewards_pool;
    use trust_16::trust_coin;
    use trust_16::utils;

    // ------
    // Errors
    // ------

    /// The length of the input vector is not as expected
    const ELENGTH_MISMATCH: u64 = 1;
    /// The round index is invalid
    const EROUND_INVALID: u64 = 2;
    /// You already submitted a decision
    const EDECSION_ALREADY_SUBMITTED: u64 = 3;
    /// Not all players have submitted their decisions
    const ENOT_ALL_SUBMITTED: u64 = 4;
    /// The pepper is already submitted
    const EPEPPER_SUBMITTED: u64 = 5;
    /// Hash mismatch
    const E_HASH_MISMATCH: u64 = 6;

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
        // useful to know when to reveal the decision inorder to avoid exposing the pepper
        allow_reveal: bool,
        pepper: option::Option<vector<u8>>,
        // key is the player's address and value is the decision; true for cooperate, false for compete
        decisions: SmartTable<address, vector<u8>>,
        // in-round balances tracker; initialized by the time the round starts, and updated after all decisions are submitted
        balances_tracker: SmartTable<address, u64>,
    }

    // ------
    // Events
    // ------

    #[event]
    struct DescisionSubmitted has drop, store {
        player: address,
        round_index: u64,
        decision: vector<u8>,
        is_first_submitter: bool,
        is_last_submitter: bool,
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
        let session_id = session::create_session(players);
        let session_signer_ref = &session::session_signer(session_id);
        // ensure the length of the duration vector is as expected
        assert!(vector::length(&duration) == rounds_count, ELENGTH_MISMATCH);
        let obj_constructor = object::create_object(session_id);
        move_to(
            session_signer_ref,
            GameInfo {
                rounds_count,
                rounds: vector::empty<Round>(),
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
        session::assert_session_valid(session_id);
        // ensure the player address is in the session
        session::assert_player_registered_in_session(signer_addr, session_id);
        // TODO: ensure the player has not joined the game yet / overriden by assert_players_eligibility ?
        // TODO: deposit the amount needed to play the game
        // add the player to the session by creating a badge and move it to the player's address
        session::add_badge_to_player(signer_ref, session_id);
    }

    public(friend) fun finish_game(session_id: address){
        // TODO: ensure the current round is the last round
        // TODO: ensure the current round is finished
        // TODO: distribute the rewards
        // end session
        session::end_session(session_id);
    }

    public(friend) fun submit_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        let is_first_submitter: bool;
        let is_last_submitter: bool;
        (is_first_submitter, is_last_submitter) = if (current_round_index(session_id) == 0) {
            submit_first_decision(signer_ref, session_id, round_index, decision);
            (true, false)
        } else if (current_round_index(session_id) == rounds_count(session_id) ) {
            submit_last_decision(signer_ref, session_id, round_index, decision);
            (false, true)
        } else {
            submit_decision_internal(signer_ref, session_id, round_index, decision);
            (false, false)
        };

        // emit event
        event::emit(DescisionSubmitted {
            player: signer::address_of(signer_ref),
            round_index,
            decision,
            is_first_submitter,
            is_last_submitter,
        });
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
        session::assert_session_valid(session_id);
        session::assert_player_active_in_session(vector[signer_addr], session_id);
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
        // initialize round and push it to the rounds vector
        initialize_round(session_id, round_index);
        // submit the decision
        submit_decision_internal(signer_ref, session_id, round_index, decision);
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
        let signer_addr = signer::address_of(signer_ref);
        // ensure the player did not submit a decision in the round yet
        let round = borrow_round(session_id, round_index);
        assert!(!smart_table::contains(&round.decisions, signer_addr), EDECSION_ALREADY_SUBMITTED);
        // submit the decision
        submit_decision_internal(signer_ref, session_id, round_index, decision);
        // toggle the allow_reveal field to true
        toggle_allow_reveal(session_id, round_index);
    }

    /// Submit pepper; callable by the system
    /// Triggered by the system when all addresses have submitted their decisions
    public(friend) fun submit_pepper(session_id: address, round_index: u64, pepper: vector<u8>) acquires GameInfo {
        // allow_reveal field must be true
        let round = borrow_round(session_id, round_index);
        assert!(round.allow_reveal, ENOT_ALL_SUBMITTED);
        // pepper option must be none
        assert!(round.pepper == option::none(), EPEPPER_SUBMITTED);
        let mut_round = borrow_round_mut(session_id, round_index);
        mut_round.pepper = option::some(pepper);
        // TODO: emit event
    }

    /// TODO: update balances_tracker from round

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
    fun round_hashed_decisions_map(session_id: address, round_index: u64): SimpleMap<address, vector<u8>> acquires GameInfo {
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

    /// Helper function to check whether all participants have submitted their decisions at a given round index
    fun are_all_decisions_submitted(session_id: address, round_index: u64): bool acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        let submitters = smart_table::keys(&round.decisions);
        let participants = session::players(session_id);
        utils::compare_vectors(&submitters, &participants)
    }

    /// Helper function to toggle the allow_reveal field to true
    /// Triggered when submit_last_decision is called
    /// TODO: redundant as we can know if all decisions are submitted by checking the length of the decisions table
    /// TODO: replace with "can_reveal" function that can be callable only by the session manager
    fun toggle_allow_reveal(session_id: address, round_index: u64) acquires GameInfo {
        are_all_decisions_submitted(session_id, round_index);
        let round = borrow_round_mut(session_id, round_index);
        round.allow_reveal = true;
    }

    /// Helper function to reveal the decisions
    fun reveal_decisions_in_round(session_id: address, round_index: u64): SimpleMap<address, bool> acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        let pepper = *option::borrow(&round.pepper);
        let (submitters, hashed_decisions) = simple_map::to_vec_pair(round_hashed_decisions_map(session_id, round_index));
        // iterate through the decisions and compare with the hash of the decision
        let revealed_decisions = vector::empty<bool>();
        let hashed_cooperate = utils::hashed_cooperate(pepper);
        let hashed_compete = utils::hashed_compete(pepper);
        for (i in 0..vector::length(&submitters)) {
            let hashed_decision = *vector::borrow(&hashed_decisions, i);
            if (hashed_decision == hashed_cooperate) {
                vector::push_back(&mut revealed_decisions, true);
            } else if (hashed_decision == hashed_compete) {
                vector::push_back(&mut revealed_decisions, false);
            } else { abort E_HASH_MISMATCH }
        };

        let res = simple_map::new<address, bool>();
        simple_map::add_all(&mut res, submitters, revealed_decisions);

        res
    }

    /// Helper function to initialize a round and push it to the rounds vector
    fun initialize_round(session_id: address, round_index: u64) acquires GameInfo {
        let round = Round {
            start_time: timestamp::now_seconds(),
            duration: round_duration(session_id, round_index),
            allow_reveal: false,
            pepper: option::none(),
            decisions: smart_table::new<address, vector<u8>>(),
            balances_tracker: smart_table::new<address, u64>(),
        };
        let mut_game_info = borrow_global_mut<GameInfo>(session_id);
        vector::push_back(&mut mut_game_info.rounds, round);
    }

    // ----------
    // Unit tests
    // ----------
}