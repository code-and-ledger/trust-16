/*
    This module defines the router for the game.
    
    Users should interact with this module to submit data on the game.

    TODO:
        - Add description
        - Move the mint function here
*/

module trust_16::router {

    use aptos_framework::event;
    use std::signer;
    use std::string::{Self, String};
    use trust_16::mechanics;
    use trust_16::short_game;

    // ---------
    // Constants
    // ---------

    // ------
    // Errors
    // ------

    /// Not authorized
    const ENOT_AUTHORIZED: u64 = 1;

    // ------
    // Events
    // ------

    #[event]
    struct SessionCreated has drop, store {
        session_id: address,
        game_type: String,
        players: vector<address>
    }

    // ---------------
    // Entry Functions
    // ---------------

    // short game

    /// Prepare a short game
    /// Callable by session manager only
    public(friend) entry fun admin_prepare_short_game(
        signer_ref: &signer,
        players: vector<address>
    ) {
        // assert that the caller is a session manager
        assert!(signer::address_of(signer_ref) == @session_manager, ENOT_AUTHORIZED);
        let session_id = short_game::prepare_game(players);
        event::emit(SessionCreated { session_id, game_type: string::utf8(b"short_game"), players });
    }

    // common

    /// Join a game
    /// Game starts when all players joined
    public(friend) entry fun join_game(
        signer_ref: &signer,
        session_id: address
    ) {
        mechanics::join_game(signer_ref, session_id);
    }

    /// Submit a decision
    public(friend) entry fun submit_decision(
        signer_ref: &signer,
        session_id: address,
        round: u64,
        decision: vector<u8>
    ) {
        mechanics::submit_decision(signer_ref, session_id, round, decision);
    }

    /// Submit a pepper
    /// Callable by session manager only
    public(friend) entry fun admin_submit_pepper_and_finish_round(
        signer_ref: &signer,
        session_id: address,
        round: u64,
        pepper: vector<u8>
    ) {
        // assert that the caller is a session manager
        assert!(signer::address_of(signer_ref) == @session_manager, ENOT_AUTHORIZED);
        mechanics::submit_pepper(session_id, round, pepper);
        mechanics::finish_round(session_id, round);
        // if last round, end game
        if (mechanics::rounds_count(session_id) == round + 1) {
            mechanics::finish_game(session_id);
        }
    }


    // ----------
    // Unit Tests
    // ----------

    #[test_only]
    friend trust_16::test_router;

    #[test_only]
    public(friend) fun admin_prepare_short_game_for_test(
        signer_ref: &signer,
        players: vector<address>
    ): address {
        // assert that the caller is a session manager
        assert!(signer::address_of(signer_ref) == @session_manager, ENOT_AUTHORIZED);
        short_game::prepare_game(players)
    }
}