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
        - implement functions to handle edge cases:
            - in-game leaving
            - not submitting a decision in time
*/

module trust_16::mechanics {
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore, Metadata};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_std::type_info::TypeInfo;
    use std::event;
    use std::option;
    use std::signer;
    use std::vector;
    use trust_16::session;
    use trust_16::rewards_pool;
    use trust_16::trust_coin;
    use trust_16::utils;

    friend trust_16::long_game;
    friend trust_16::router;
    friend trust_16::short_game;

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
    /// The game is not finished yet
    const EGAME_NOT_FINISHED: u64 = 7;

    // ---------
    // Resources
    // ---------

    /// Global storage for the game data
    struct GameInfo has key {
        type: TypeInfo,
        rounds_count: u64,
        rounds_durations: vector<u64>,
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
        // useful to know when to reveal the decision inorder to avoid exposing the pepper
        allow_reveal: bool,
        pepper: option::Option<vector<u8>>,
        // key is the player's address and value is the decision; true for cooperate, false for compete
        decisions: SmartTable<address, vector<u8>>,
    }

    // ------
    // Events
    // ------

    #[event]
    struct DescisionSubmitted has drop, store {
        player: address,
        round_index: u64,
        decision: vector<u8>,
        is_first_decision_in_round: bool,
        is_last_decision_in_round: bool,
    }

    // -------
    // Asserts
    // -------

    /// Ensure round is valid: 
    /// - given round index is equal to the current round index
    /// - the current time is within the round duration
    public fun assert_round_valid(session_id: address, round_index: u64) acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        let round_time = if (round_index == 0) {
            round_start_time(session_id, 0)
        } else {
            round_start_time(session_id, (round_index - 1)) + round_duration(session_id, round_index)
        };
        let round_duration = round_duration(session_id, round_index);
        let current_time = timestamp::now_seconds();
        // time check
        assert!(current_time >= round_time && current_time <= round_time + round_duration, EROUND_INVALID);
    }

    // ---------------
    // Entry Functions
    // ---------------

    /// Creates the game for matchmaking
    /// Returns the session id
    public(friend) fun prepare_game(
        type: TypeInfo,
        players: vector<address>,
        rounds_count: u64,
        rounds_durations: vector<u64>
    ): address {
        let session_id = session::create_session(players);
        let session_signer_ref = &session::session_signer(session_id);
        // ensure the length of the duration vector is as expected
        assert!(vector::length(&rounds_durations) == rounds_count, ELENGTH_MISMATCH);
        // prepare initial balances and balances tracker
        let addresses = vector[rewards_pool::pool_address()];
        vector::append(&mut addresses, players);
        let balances = vector::empty<u64>();
        for (i in 0..vector::length(&addresses)) {
            vector::push_back(&mut balances, 0);
        };
        let table = smart_table::new<address, u64>();
        let table_2 = smart_table::new<address, u64>();
        smart_table::add_all<address, u64>(&mut table, addresses, balances);
        smart_table::add_all<address, u64>(&mut table_2, addresses, balances);

        let obj_constructor = object::create_object(session_id);
        move_to(
            session_signer_ref,
            GameInfo {
                type,
                rounds_count,
                rounds_durations,
                rounds: vector::empty<Round>(),
                initial_balances: table,
                balances_tracker: table_2,
                pool: fungible_asset::create_store<Metadata>(&obj_constructor, trust_coin::metadata()),
            }
        );

        session_id

        /// TODO: emit event indicating this game is short
    }

    /// Start the game
    /// Triggered when all players have joined the game
    public(friend) fun start_game(session_id: address) {
        // TODO: ensure all players have joined the game
        session::start_session(session_id);
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
        // if all players have joined the game, start the game
        let players = session::players(session_id);
        let all_joined = vector::empty<bool>();
        for (i in 0..vector::length(&players)) {
            let player = *vector::borrow(&players, i);
            if (session::has_active_session(player)) {
                vector::push_back(&mut all_joined, true);
            };
        };
        if (vector::length(&all_joined) == vector::length(&players)) {
            start_game(session_id);
        };
    }

    /// Finish the game and distribute the rewards
    /// Triggered when the last round is finished
    /// 1. ensure the current round is the last round
    /// 2. ensure the current round is finished
    /// 3. distribute the rewards
    /// 4. end session
    public(friend) fun finish_game(session_id: address) acquires GameInfo {
        // ensure the current round is the last round
        let current_round_index = current_round_index(session_id);
        assert!((current_round_index + 1) == rounds_count(session_id), EGAME_NOT_FINISHED);
        // ensure the current round is finished
        assert_round_valid(session_id, current_round_index);
        // distribute the rewards
        distribute_rewards(session_id);
        // TODO: remove_badges_from_players
        // end session
        session::end_session(session_id);
    }   

    /// Submit the decision
    public(friend) fun submit_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        let is_first_decision_in_round: bool;
        let is_last_decision_in_round: bool;
        (is_first_decision_in_round, is_last_decision_in_round) = if (is_first_decision_in_round(session_id, round_index)) {
            submit_first_decision(signer_ref, session_id, round_index, decision);
            (true, false)
        // last submitter
        } else if (is_last_decision_in_round(session_id, round_index)) {
            submit_last_decision(signer_ref, session_id, round_index, decision);
            (false, true)
        // middle submitter
        } else {
            submit_decision_internal(signer_ref, session_id, round_index, decision);
            (false, false)
        };

        // emit event
        event::emit(DescisionSubmitted {
            player: signer::address_of(signer_ref),
            round_index,
            decision,
            is_first_decision_in_round,
            is_last_decision_in_round,
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
        // ensure the player did not submit a decision in the round yet
        let round = borrow_round(session_id, round_index);
        assert!(!smart_table::contains(&round.decisions, signer_addr), EDECSION_ALREADY_SUBMITTED);
        // store the decision
        let mut_round = borrow_round_mut(session_id, round_index);
        smart_table::upsert(&mut mut_round.decisions, signer_addr, decision);
    }

    /// Submit the first decision of the round
    /// Triggered by the first player submitting their decision
    /// Triggered when decisions.len == 0
    fun submit_first_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        // initialize round and push it to the rounds vector
        initialize_round(session_id, round_index);
        // submit the decision
        submit_decision_internal(signer_ref, session_id, round_index, decision);
    }
        
    /// Submit the last decision of the round
    /// Triggered by the last player submitting their decision
    /// Triggered when decisions.len + 1 == decisions.len
    fun submit_last_decision(
        signer_ref: &signer,
        session_id: address,
        round_index: u64,
        decision: vector<u8>
    ) acquires GameInfo {
        let signer_addr = signer::address_of(signer_ref);
        // submit the decision
        submit_decision_internal(signer_ref, session_id, round_index, decision);
        // toggle the allow_reveal field to true; moved to submit_pepper
    }

    /// Submit pepper; callable by the system
    /// Triggered by the system when all addresses have submitted their decisions
    public(friend) fun submit_pepper(session_id: address, round_index: u64, pepper: vector<u8>) acquires GameInfo {
        // allow_reveal field must be true
        // let round = borrow_round(session_id, round_index);
        // assert!(round.allow_reveal, ENOT_ALL_SUBMITTED);
        // assert all players have submitted their decisions
        assert!(are_all_decisions_submitted(session_id, round_index), ENOT_ALL_SUBMITTED);
        // toggle the allow_reveal field to true
        let mut_round = borrow_round_mut(session_id, round_index);
        mut_round.allow_reveal = true;
        // pepper option must be none
        assert!(mut_round.pepper == option::none(), EPEPPER_SUBMITTED);
        let mut_round = borrow_round_mut(session_id, round_index);
        mut_round.pepper = option::some(pepper);
        // TODO: emit event
    }

    /// Finish the round
    /// Triggered when submit_last_decision is called
    /// 1. add hash_key to the Round resource via submit_pepper
    /// 2. update in-round balances tracker and append them to the balances tracker from game info
    public(friend) fun finish_round(session_id: address, round_index: u64) acquires GameInfo {
        // ensure the round is active
        assert_round_valid(session_id, round_index);
        // ensure all decisions are submitted
        assert!(are_all_decisions_submitted(session_id, round_index), ENOT_ALL_SUBMITTED);
        // calculate the rewards and update the balances tracker
        calculate_rewards_and_update_balance_tracker(session_id, round_index);
    }

    // ------------------
    // Internal Functions
    // ------------------
    
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
        if (vector::length(&game_info.rounds) == 0) {
            0
        } else {
            vector::length(&game_info.rounds) - 1
        }
    }

    /// Helper function to get the game type
    public(friend) fun game_type(session_id: address): TypeInfo acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        game_info.type
    }

    /// Helper function to get the start time of a round at a given index
    public(friend) fun round_start_time(session_id: address, round_index: u64): u64 acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        round.start_time
    }

    /// Helper function to get the duration of a round at a given index
    public(friend) fun round_duration(session_id: address, round_index: u64): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        *vector::borrow(&game_info.rounds_durations, round_index)
    }

    /// Helper function to get the decisions of a round at a given index
    public(friend) fun round_hashed_decisions_map(session_id: address, round_index: u64): SimpleMap<address, vector<u8>> acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        smart_table::to_simple_map(&round.decisions)
    }

    /// Helper function to calculate the round deposit amount per player
    /// initial_balances[player] / rounds_count (can query at index 1 or up, since index 0 is the balance from universal reward pool)
    public(friend) fun player_round_deposit_amount(session_id: address, player_addr: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        *smart_table::borrow(&game_info.initial_balances, player_addr) / rounds_count(session_id)
    }

    /// Helper function to calculate the round deposit amount assuming all players have the same deposit amount
    /// initial_balances[any_player] / rounds_count
    public(friend) fun round_deposit_amount(session_id: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        let any_player = *smart_table::borrow(&game_info.initial_balances, *vector::borrow(&session::players(session_id), 0));
        (any_player / rounds_count(session_id))
    }

    /// Helper function to return all the players' deposit amounts in round
    public(friend) fun round_total_players_deposit_amount(session_id: address): u64 acquires GameInfo {
        let players = session::players(session_id);
        let total = 0;
        for (i in 0..vector::length(&players)) {
            total = total + player_round_deposit_amount(session_id, *vector::borrow(&players, i));
        };

        total
    }

    /// Helper function to calculate the round deposit amount from the universal reward pool
    /// should be equal to the total total_deposit_amounts from players
    public(friend) fun round_rewards_pool_deposit_amount(session_id: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        let rewards_pool_deposit = *smart_table::borrow(&game_info.initial_balances, rewards_pool::pool_address());
        (rewards_pool_deposit / rounds_count(session_id))
    }

    /// Helper function to calculate the total in-round rewards 
    /// total_in_round_rewards = round_deposit_amount * players_count + round_rewards_pool_deposit_amount
    public(friend) fun total_in_round_rewards(session_id: address): u64 acquires GameInfo {
        let players_count = vector::length(&session::players(session_id));
        let round_rewards_pool_deposit = round_rewards_pool_deposit_amount(session_id);
        let round_deposit_amount = round_deposit_amount(session_id);
        (round_deposit_amount * players_count + round_rewards_pool_deposit)
    }

    /// Helper function to check whether the round is active
    /// active if the current time is within the round duration
    public(friend) fun is_active(session_id: address, round_index: u64): bool acquires GameInfo {
        timestamp::now_seconds() < (round_start_time(session_id, round_index) + round_duration(session_id, round_index))
    }

    /// Helper function to check whether all participants have submitted their decisions at a given round index
    public(friend) fun are_all_decisions_submitted(session_id: address, round_index: u64): bool acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        let submitters = smart_table::keys(&round.decisions);
        let participants = session::players(session_id);
        utils::compare_vectors(&submitters, &participants)
    }

    /// Helper function to reveal the decisions
    public(friend) fun reveal_decisions_in_round(session_id: address, round_index: u64): SimpleMap<address, bool> acquires GameInfo {
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
        let game_info = borrow_global<GameInfo>(session_id);
        // ensure the previous round is finished
        if (vector::length(&game_info.rounds) > 0) {
            assert_round_valid(session_id, round_index);
        };
        
        let round = Round {
            start_time: timestamp::now_seconds(),
            allow_reveal: false,
            pepper: option::none(),
            decisions: smart_table::new<address, vector<u8>>()
        };
        let mut_game_info = borrow_global_mut<GameInfo>(session_id);
        vector::push_back(&mut mut_game_info.rounds, round);
    }

    /// Helper function to check if the first submitter in the round at a given index has submitted a decision
    public(friend) fun is_first_decision_in_round(session_id: address, round_index: u64): bool acquires GameInfo {
        // first case: first round
        let game_info = borrow_global<GameInfo>(session_id);
        if (vector::length(&game_info.rounds) == round_index) { true } else { false }
    }

    /// Helper function to check if submitter is the last submitter in the round at a given index
    public(friend) fun is_last_decision_in_round(session_id: address, round_index: u64): bool acquires GameInfo {
        // get the number of decisions submitted
        let round = borrow_round(session_id, round_index);
        let submitters = smart_table::keys(&round.decisions);
        // compare it with the number of players in the session
        let participants = session::players(session_id);
        if (vector::length(&submitters) == vector::length(&participants)) 
        { true } else { false }
    }

    /// Helper function to calculate the rewards for a round
    /// Triggered when the round is finished (all decisions are submitted)
    /// 1. calculate the number of cooperators and competitors and compare them
    /// 2. if competitors = 0, distribute the rewards equally among all participants
    /// 3. if cooperators <= competitors, distribute the rewards to the competitors only, and the in-round rewards to the cooperators
    /// 4. if cooperators = 0, in-round rewards are added to the universal rewards pool
    fun calculate_rewards_and_update_balance_tracker(
        session_id: address,
        round_index: u64
    ) acquires GameInfo {
        let round = borrow_round(session_id, round_index);
        let pepper = *option::borrow(&round.pepper);
        let hashed_cooperate = utils::hashed_cooperate(pepper);
        let hashed_compete = utils::hashed_compete(pepper);
        let rewards_amount = total_in_round_rewards(session_id);
        let rewards_pool_deposit_per_round = round_rewards_pool_deposit_amount(session_id);
        let round_total_players_deposit_amount = round_total_players_deposit_amount(session_id);

        // get all decisions
        let revealed_decisions = reveal_decisions_in_round(session_id, round_index);
        // get the vectors from the simple map
        let (submitters, decisions) = simple_map::to_vec_pair(revealed_decisions);
        // calculate the number of cooperators and competitors
        let (cooperators, competitors) = (0, 0);
        for (i in 0..vector::length(&decisions)) {
            let decision = *vector::borrow(&decisions, i);
            if (decision) {
                cooperators = cooperators + 1;
            } else {
                competitors = competitors + 1;
            }
        };

        // update balances tracker from round based on the revealed decisions
        let mut_round = borrow_round_mut(session_id, round_index);
        let mut_balances_tracker = &mut borrow_global_mut<GameInfo>(session_id).balances_tracker;
        
        if (competitors == 0 || cooperators > competitors) {
            // distribute the balance tracker of the in-round rewards equally to all participants
            let rewards_per_player = rewards_amount / vector::length(&submitters);
            for (i in 0..vector::length(&submitters)) {
                let player = *vector::borrow(&submitters, i);
                // get the current player's balance from the balances tracker
                let current_balance = *smart_table::borrow_mut(mut_balances_tracker, player);
                smart_table::upsert(mut_balances_tracker, player, (rewards_per_player + current_balance));
            }
        } else if (cooperators <= competitors) {
            // distribute the rewards to the cooperators only
            let rewards_from_rewards_pool_per_player = rewards_pool_deposit_per_round / cooperators;
            // distribute round_deposit_amount to the competitors
            let round_rewards_per_competitor = round_total_players_deposit_amount / competitors;
            for (i in 0..vector::length(&submitters)) {
                let player = *vector::borrow(&submitters, i);
                let decision = *vector::borrow(&decisions, i);
                // get the current player's balance from the balances tracker
                let current_balance = *smart_table::borrow_mut(mut_balances_tracker, player);
                if (decision) {
                    smart_table::upsert(mut_balances_tracker, player, (rewards_from_rewards_pool_per_player + current_balance));
                } else {
                    smart_table::upsert(mut_balances_tracker, player, (current_balance + round_rewards_per_competitor));
                }
            }
        } else if (cooperators == 0) {
            // add the in-round rewards to the universal rewards pool
            let current_balance = *smart_table::borrow_mut(mut_balances_tracker, rewards_pool::pool_address());
            smart_table::upsert(mut_balances_tracker, rewards_pool::pool_address(), (rewards_pool_deposit_per_round + current_balance));
        }
    }

    /// Helper function to distribute the rewards
    /// Triggered when the last round is finished
    /// 2. distribute the rewards based on the balances tracker from the game info
    fun distribute_rewards(session_id: address) acquires GameInfo {
        let game_info = borrow_global_mut<GameInfo>(session_id);
        let balances_tracker = &game_info.balances_tracker;
        let addresses = smart_table::keys(balances_tracker);
        for (i in 0..vector::length(&addresses)) {
            let addr = *vector::borrow(&addresses, i);
            let balance = *smart_table::borrow(balances_tracker, addr);
            // TODO: 
        }
    }

    // --------------
    // View Functions
    // --------------

    #[view]
    /// Returns the current round index
    public fun live_round_index(session_id: address): u64 acquires GameInfo {
        current_round_index(session_id)
    }

    #[view]
    /// Helper function to get the number of rounds in the game given a session id
    public fun rounds_count(session_id: address): u64 acquires GameInfo {
        let game_info = borrow_global<GameInfo>(session_id);
        game_info.rounds_count
    }

    // ----------
    // Unit tests
    // ----------

    #[test_only]
    use aptos_std::type_info;
    
    #[test_only]
    friend trust_16::test_mechanics;

    #[test_only]
    friend trust_16::test_short_game;

    #[test_only]
    struct GameType has key {}

    #[test_only]
    public fun game_type_for_test(): TypeInfo {
        type_info::type_of<GameType>()
    }
}