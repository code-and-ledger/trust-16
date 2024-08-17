/*
    This module defines the core mechanics of the cooperate bail game

    can be used for 2 players or more

    TODO: 
        - 
*/

module trust_16::cooperate_bail {
    use aptos_framework::object;
    use trust_16::match;

    // ---------
    // Resources
    // ---------

    // ------
    // Events
    // ------

    #[event]
    struct Results {
        room_id: address,
        result: vector<u8>, // TODO: should be enum: BAIL or COOPERATE
        cooperators: vector<address>,
        bailors: vector<address>,
        amount_to_bail: u64,
        amount_to_cooperate: u64
    }

    // -------
    // Asserts
    // -------

    // ---------------
    // Entry Functions
    // ---------------

    /// Gets the desicions of the players as input and proceed with the defined scenarios
    /// In case of more than two players, the majority wins.
    public(friend) fun admin_proceed(
        signer_ref: &signer,
        room_id: address,
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
        room_id: address,
        hash_key: vector<u8>,
        hashed_decisions: vector<vector<u8>>,
        bail_amount: u64
    ) {

    }

    // ----------
    // Unit tests
    // ----------
}