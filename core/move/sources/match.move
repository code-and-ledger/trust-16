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


    // ---------
    // Resources
    // ---------

    /// Global storage for the game data
    struct Info<GameType> has key {
        room_id: address,
        players: vector<address>,
        deposited_amount: u64,
    }

    // ------
    // Events
    // ------



    /// Function to create a new game room; usable only by defined signers
    public(friend) fun create_game_room<GameType>(
        players: vector<address>,
        deposited_amount: u64
    ) {
        
    }
}