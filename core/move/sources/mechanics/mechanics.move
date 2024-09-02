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
    use aptos_framework::object;
    use aptos_framework::smart_table::{Self, SmartTable};
    use trust_16::match;

    // ---------
    // Resources
    // ---------

    /// Global storage for the game data
    struct GameInfo has key {
        rounds: vector<Round>,
        deposits: DepositInfo,
    }

    /// Global storage for the round data
    struct Round has key, store {
        start_time: u64, // in seconds
        duration: u64, // in seconds
        // key is the player's address and value is the decision; true for cooperate, false for compete
        decisions: SmartTable<address, bool>
    }

    /// Global storage for the deposit data
    struct DepositInfo has key, store {
        // initial deposit amount per player; useful to calculate rewards pool deposit too
        initial_player_deposit: u64,
        balances: SmartTable<address, FungibleAsset>
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
        rounds_count: u64,
        duration_per_round: u64,
        total_deposit_amount_per_player: u64
    ) {
        let session_id = match::create_session(players, deposits);
        let session_signer_ref = &session::session_signer(session_id);
        let deposit_info = DepositInfo {
            initial_player_deposit: total_deposit_amount_per_player,
            balances: smart_table::new<address, FungibleAsset>()
        };
        let game_info = GameInfo {
            rounds: vector::empty<Round>(),
            deposits: deposit_info
        };
        move_to(session_signer_ref, game_info);
    }

    /// Join the game
    public(friend) fun join_game() {}

    public(friend) fun finish_game(){}

    public(friend) fun pre_round(){}

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