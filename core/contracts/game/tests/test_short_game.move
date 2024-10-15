/*
    TODO: 
        - 
*/
#[test_only]
module trust_16::test_short_game {
    use std::signer;
    use trust_16::mechanics;
    use trust_16::short_game;
    use trust_16::test_utils;
    use trust_16::utils;

    const PEPPER: vector<u8> = b"trust_test";

    #[test(aptos_framework = @0x1, dev = @dev, trust_coin = @trust_coin, trust_16 = @trust_16, session_manager = @session_manager, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun e2e(aptos_framework: &signer, dev: &signer, trust_coin: &signer, trust_16: &signer, session_manager: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, dev, trust_coin, trust_16, session_manager, alice, bob, charlie);
        let session_id = short_game::prepare_game(
            vector[signer::address_of(alice), signer::address_of(bob)]
        );
        mechanics::join_game(alice, session_id);
        mechanics::join_game(bob, session_id);
        // game automatically starts when all players joined
        
        // first round
        mechanics::submit_decision(
            alice,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_decision(
            bob,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_pepper(session_id, 0, PEPPER);
        mechanics::finish_round(session_id, 0);

        // finish the game
        mechanics::finish_game(session_id);

    }
}