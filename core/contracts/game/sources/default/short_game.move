/*
    This module defines the logic for the fixed short move mode.
    
*/

module trust_16::short_game { 

    use aptos_std::type_info;
    use std::vector;
    use trust_16::mechanics;

    friend trust_16::router;

    // ---------
    // Constants
    // ---------

    /// The total number of players allowed per game
    const PLAYERS_COUNT: u8 = 2;
    /// The total number of rounds in a game
    const ROUNDS_COUNT: u8 = 1;
    /// Round duration in seconds
    const ROUND_DURATION: u64 = 60; 

    // ------
    // Errors
    // ------

    /// The number of players is invalid
    const EPLAYERS_COUNT_INVALID: u64 = 1;

    // ---------
    // Resources
    // ---------

    /// Struct for the short game mode
    struct ShortGame {}

    // ---------------
    // Entry Functions
    // ---------------
    
    /// prepare game
    public(friend) fun prepare_game(players: vector<address>): address {
        assert!(vector::length(&players) == (PLAYERS_COUNT as u64), EPLAYERS_COUNT_INVALID);
        let durations = vector::empty<u64>();
        for (i in 0..ROUNDS_COUNT) {
            vector::push_back(&mut durations, ROUND_DURATION);
        };

        mechanics::prepare_game(
            type_info::type_of<ShortGame>(),
            players,
            (ROUNDS_COUNT as u64),
            durations
        )
    }

    // --------------
    // View Functions
    // --------------

    #[view]
    /// Returns the players count required for a short game
    public fun players_count(): u8 { PLAYERS_COUNT }

    #[view]
    /// Returns the rounds count required for a short game
    public fun rounds_count(): u8 { ROUNDS_COUNT }

    #[view]
    /// Returns the round duration required for a short game
    public fun round_duration(): u64 { ROUND_DURATION }

    // ----------
    // Unit Tests
    // ----------

    #[test_only]
    friend trust_16::test_short_game;
}