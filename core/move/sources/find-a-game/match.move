/*
    Module responsible for matching two players in a game room.

    A game room data strcutures is an object with the following properties:
    - id: object address
    - resources: Containting the the addresses of matched wallets
    - The deposited amount
    - The game type
*/

module trust_16::match {
    use aptos_framework::object;
    use aptos_std::option::{Self, Option};

    // ---------
    // Resources
    // ---------

    /// Global storage for the global information; serves as a lobby
    struct GlobalInfo has key {
        // 
    }

    /// Global storage for the game data
    struct RoomInfo<GameType> has key {
        // address of the object holding the game room data
        room_id: address,
        // creation timestamp; useful to calculate the allowed time for joining the game
        created_at: u64,
        // start timestamp to track when both players have joined the game
        started_at: Option<u64>,
        players: vector<address>,
        deposited_amount: u64,
    }

    // ------
    // Events
    // ------



    /// Function to create a new game room; usable only by defined signers
    public(friend) fun create_game<GameType>(
        players: vector<address>,
        deposited_amount: u64
    ) {
        // ensure players don't have any active game
    }


    /// Function to trigger when all players have joined the game
    /// This will trigger the game to start
    public(friend) fun start_game<GameType>(
        room_id: address
    ) {
        
    }
}