/*
    Module responsible for matching two players in a session.

    A session data strcutures is an object with the following properties:
    - id: object address
    - resources: Containting the the addresses of matched wallets
    - The deposited amount
    - The game type

    TODO: 
        - debate on whether we delete Badge and use tracker.move instead
        - add events
*/

module trust_16::session {
    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::fungible_asset::{Self, Metadata, FungibleAsset};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::smart_vector::{Self, SmartVector};
    use aptos_framework::timestamp;
    use aptos_std::option::{Self, Option};
    // use std::signer;
    use std::vector;

    friend trust_16::mechanics;

    // ---------
    // Constants
    // ---------

    // ------
    // Errors
    // ------

    /// A player has an active game or did not leave the previous game
    const EPLAYER_HAS_ACTIVE_GAME: u64 = 1;
    /// The session is wrong or not valid
    const ESESSION_INVALID: u64 = 2;
    /// The time is invalid
    const ETIME_INVALID: u64 = 3;

    // ---------
    // Resources
    // ---------

    /// Global storage for the global information; serves as a lobby
    struct GlobalInfo has key {
        // table of all active sessions
        active_sessions: SmartVector<address>,
    }

    /// Global storage for the game data
    struct SessionInfo has key {
        // creation timestamp; useful to calculate the allowed time for joining the game
        created_at: u64,
        // start timestamp to track when both players have joined the game
        started_at: Option<u64>,
        players: vector<address>,
        // used to generate signer reference to create and manage sessions
        extend_ref: object::ExtendRef,
    }

    /// Global resource stored under wallets that got matched and are in a session
    struct Badge has key {
        // address of the object holding the session data
        session_id: address
    }

    // ------
    // Events
    // ------

    /// TODO: game creation events must be defined in game types modules

    // -------
    // Asserts
    // -------

    /// sanity check to ensure the session is valid
    public fun assert_session_valid(session_id: address) {
        assert!(session_exists(session_id), ESESSION_INVALID);
    }

    /// Sanity check to ensure players are eligible to play
    public fun assert_players_eligibility(players: vector<address>) {
        for (i in 0..vector::length(&players)) {
            let player_addr = *vector::borrow(&players, i);
            // ensure player are not in any active game
            assert!(!has_active_session(player_addr), EPLAYER_HAS_ACTIVE_GAME);
        }
    }

    /// Sanity check to ensure the player's address is registered in the session 
    public fun assert_player_registered_in_session(player_addr: address, session_id: address) acquires SessionInfo {
        let session_info = borrow_global<SessionInfo>(session_id);
        let players = session_info.players;
        let (player_exists, _) = vector::index_of(&players, &player_addr);
        assert!(player_exists, ESESSION_INVALID);
    }

    /// Sanity check to ensure the player is in the session
    public fun assert_player_active_in_session(players: vector<address>, session_id: address) acquires Badge {
        for (i in 0..vector::length(&players)) {
            let player_addr = *vector::borrow(&players, i);
            assert!(player_is_in_session(player_addr, session_id), ESESSION_INVALID);
        }  
    }
    

    // --------------------
    // Initializer Function
    // --------------------

    /// Initializes the global info resource
    fun init_module(deployer: &signer) {
        move_to(
            deployer,
            GlobalInfo {
                active_sessions: smart_vector::new<address>()
            }
        )
    }

    /// Function to create a new session; usable only by defined signers
    /// Returns the session id
    /// The number of players and the deposit amount are specific to a game type and are defined in the game type module
    public(friend) fun create_session(
        players: vector<address>
    ): address {
        // eligibility check
        assert_players_eligibility(players);
        // create a session object and deposit the amount
        let constructor_ref = &object::create_object(@trust_16);
        let id = object::address_from_constructor_ref(constructor_ref);
        // create session info resource and move it to the session object
        move_to(
            &object::generate_signer(constructor_ref),
            SessionInfo {
                created_at: timestamp::now_seconds(),
                started_at: option::none(),
                players,
                extend_ref: object::generate_extend_ref(constructor_ref)
            }
        );

        id
    }

    /// Function to trigger when all players have joined the game
    /// This will trigger the game to start
    public(friend) fun start_session(session_id: address) acquires GlobalInfo, SessionInfo {
        // trigger the game to start
        let session_info = borrow_global_mut<SessionInfo>(session_id);
        let time_now_seconds = timestamp::now_seconds();
        assert!(session_info.created_at <= time_now_seconds, ETIME_INVALID);
        session_info.started_at = option::some(time_now_seconds);
        // add the session to the active sessions list
        let global_info = borrow_global_mut<GlobalInfo>(@trust_16);
        smart_vector::push_back(&mut global_info.active_sessions, session_id);
    }

    /// Function to end the session
    /// This will trigger the game to end
    public(friend) fun end_session(session_id: address) acquires Badge, SessionInfo, GlobalInfo {
        // ensure session exists
        let session_info = borrow_global_mut<SessionInfo>(session_id);
        // remove badges from players
        for (i in 0..vector::length(&session_info.players)) {
            let player_addr = *vector::borrow(&session_info.players, i);
            remove_badges_from_players(player_addr);
        };
        // remove the session from the global info
        let global_info = borrow_global_mut<GlobalInfo>(@trust_16);
        let active_sessions = &mut global_info.active_sessions;
        let (session_exists, index) = smart_vector::index_of(active_sessions, &session_id);
        assert!(session_exists, ESESSION_INVALID);
        smart_vector::remove(active_sessions, index);
    }

    /// Function to get the signer of the session manager object
    public(friend) fun session_signer(session_id: address): signer acquires SessionInfo {
        let session_info = borrow_global<SessionInfo>(session_id);
        object::generate_signer_for_extending(&session_info.extend_ref)
    }

    // --------------
    // View Functions
    // --------------

    #[view]
    /// Returns if the session exists
    public fun session_exists(session_id: address): bool {
        exists<SessionInfo>(session_id)
    }

    #[view]
    /// Returns true if a player is in a session
    public fun has_active_session(player_addr: address): bool {
        exists<Badge>(player_addr)
    }

    #[view]
    /// Returns the active session id of a player
    public fun active_session_id(player_addr: address): Option<address> acquires Badge {
        if (has_active_session(player_addr)) {
            let badge = borrow_global<Badge>(player_addr);
            option::some(badge.session_id)
        } else {
            option::none()
        }
    }

    #[view]
    /// Returns true if the player is in the session
    public fun player_is_in_session(player_addr: address, session_id: address): bool acquires Badge {
        if (has_active_session(player_addr)) {
            let badge = borrow_global<Badge>(player_addr);
            badge.session_id == session_id
        } else {
            false
        }
    }

    #[view]
    /// Returns whether the session is active or not
    public fun is_active(session_id: address): bool acquires GlobalInfo {
        let global_info = borrow_global<GlobalInfo>(@trust_16);
        smart_vector::contains(&global_info.active_sessions, &session_id)
    }

    #[view]
    /// Returns the addresses of the players in the session
    public fun players(session_id: address): vector<address> acquires SessionInfo {
        let session_info = borrow_global<SessionInfo>(session_id);
        session_info.players
    }

    // ----------------
    // Helper Functions
    // ----------------

    /// Internal function to add badges to players joining a session, disallowing them to join another session
    public(friend) fun add_badge_to_player(signer_ref: &signer, session_id: address) {
        move_to(signer_ref, Badge { session_id });  
    }

    /// Internal function to remove badges from players, allowing them to leave the session
    public(friend) fun remove_badges_from_players(player_addr: address) acquires Badge {
        let Badge { session_id: _ } = move_from<Badge>(player_addr);
    }

    // ----------
    // Unit tests
    // ----------

    #[test_only]
    friend trust_16::test_session;

    #[test_only]
    friend trust_16::test_utils;

    #[test_only]
    friend trust_16::test_mechanics;

    #[test_only]
    public fun init_for_test(deployer: &signer) {
        init_module(deployer);
    }
            
}