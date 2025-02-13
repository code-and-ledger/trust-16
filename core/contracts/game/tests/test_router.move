/*
    TODO:
        - check test_utils.move
*/

#[test_only]
module trust_16::test_router {
    use std::signer;
    use trust_16::router;
    use trust_16::test_utils;
    use trust_16::utils;

    const PEPPER: vector<u8> = b"trust_test";

    #[test(aptos_framework = @0x1, dev = @dev, trust_coin = @trust_coin, trust_16 = @trust_16, session_manager = @session_manager, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun admin_prepare_short_game(aptos_framework: &signer, dev: &signer, trust_coin: &signer, trust_16: &signer, session_manager: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, dev, trust_coin, trust_16, session_manager, alice, bob, charlie);
        router::admin_prepare_short_game(
            session_manager,
            vector[signer::address_of(alice), signer::address_of(bob)]
        );
    }

    #[test(aptos_framework = @0x1, dev = @dev, trust_coin = @trust_coin, trust_16 = @trust_16, session_manager = @session_manager, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun short_game(aptos_framework: &signer, dev: &signer, trust_coin: &signer, trust_16: &signer, session_manager: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, dev, trust_coin, trust_16, session_manager, alice, bob, charlie);
        let session_id = router::admin_prepare_short_game_for_test(
            session_manager,
            vector[signer::address_of(alice), signer::address_of(bob)]
        );
        router::join_game(alice, session_id);
        router::join_game(bob, session_id);
        // game automatically starts when all players joined

        // first round
        router::submit_decision(
            alice,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );
        router::submit_decision(
            bob,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );
        router::admin_submit_pepper_and_finish_round(
            session_manager,
            session_id,
            0,
            PEPPER
        );
    }
}