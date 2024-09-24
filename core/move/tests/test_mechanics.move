/*
    TODO: 
        - 
*/
#[test_only]
module trust_16::test_mechanics {
    use aptos_framework::timestamp;
    use std::debug;
    use std::signer;
    use std::string::{Self, String};
    use trust_16::mechanics;
    use trust_16::session;
    use trust_16::test_utils;
    use trust_16::utils;

    const PEPPER: vector<u8> = b"trust_test";

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun prepare_game(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        let session_id = mechanics::prepare_game(
            mechanics::game_type_for_test(),
            vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)],
            5,
            vector[60, 60, 60, 60, 60]
        );
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun join_game(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        let session_id = mechanics::prepare_game(
            mechanics::game_type_for_test(),
            vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)],
            5,
            vector[60, 60, 60, 60, 60]
        );
        mechanics::join_game(alice, session_id);
        mechanics::join_game(bob, session_id);
        mechanics::join_game(charlie, session_id);
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun start_game(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        // start session
        let session_id = mechanics::prepare_game(
            mechanics::game_type_for_test(),
            vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)],
            5,
            vector[60, 60, 60, 60, 60]
        );
        mechanics::join_game(alice, session_id);
        mechanics::join_game(bob, session_id);
        mechanics::join_game(charlie, session_id);

        // all players joined the session, the session should start
        mechanics::start_game(session_id);
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun submit_first_decision(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        // start session
        let session_id = mechanics::prepare_game(
            mechanics::game_type_for_test(),
            vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)],
            5,
            vector[60, 60, 60, 60, 60]
        );
        mechanics::join_game(alice, session_id);
        mechanics::join_game(bob, session_id);
        mechanics::join_game(charlie, session_id);

        // all players joined the session, the session should start
        mechanics::start_game(session_id);

        // debug::print<String>(&string::utf8(b"current round index: "));
        // debug::print<u64>(&mechanics::live_round_index(session_id));

        assert!(mechanics::live_round_index(session_id) == 0, 1);

        // submit decisions
        mechanics::submit_first_decision(
            alice,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );

        assert!(mechanics::live_round_index(session_id) == 0, 1);
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun round_e2e(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        // start session
        let session_id = mechanics::prepare_game(
            mechanics::game_type_for_test(),
            vector[signer::address_of(alice), signer::address_of(bob)],
            5,
            vector[60, 60, 60, 60, 60]
        );
        mechanics::join_game(alice, session_id);
        mechanics::join_game(bob, session_id);

        // all players joined the session, the session should start
        mechanics::start_game(session_id);

        assert!(mechanics::live_round_index(session_id) == 0, 1);

        // submit decisions
        mechanics::submit_first_decision(
            alice,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );

        mechanics::submit_last_decision(
            bob,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );

        mechanics::submit_pepper(session_id, 0, PEPPER);
        mechanics::finish_round(session_id, 0);
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun game_e2e(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        // start session
        let session_id = mechanics::prepare_game(
            mechanics::game_type_for_test(),
            vector[signer::address_of(alice), signer::address_of(bob)],
            5,
            vector[60, 60, 60, 60, 60]
        );
        mechanics::join_game(alice, session_id);
        mechanics::join_game(bob, session_id);

        // all players joined the session, the session should start
        mechanics::start_game(session_id);

        assert!(mechanics::live_round_index(session_id) == 0, 1);

        // first round
        mechanics::submit_first_decision(
            alice,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_last_decision(
            bob,
            session_id,
            0,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_pepper(session_id, 0, PEPPER);
        mechanics::finish_round(session_id, 0);

        // fast forward to start the next round
        timestamp::fast_forward_seconds(60);

        // second round
        mechanics::submit_first_decision(
            alice,
            session_id,
            1,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_last_decision(
            bob,
            session_id,
            1,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_pepper(session_id, 1, PEPPER);
        mechanics::finish_round(session_id, 1);

        // fast forward to start the next round
        timestamp::fast_forward_seconds(60);
        
        // third round
        mechanics::submit_first_decision(
            alice,
            session_id,
            2,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_last_decision(
            bob,
            session_id,
            2,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_pepper(session_id, 2, PEPPER);
        mechanics::finish_round(session_id, 2);

        // fast forward to start the next round
        timestamp::fast_forward_seconds(60);

        // fourth round
        mechanics::submit_first_decision(
            alice,
            session_id,
            3,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_last_decision(
            bob,
            session_id,
            3,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_pepper(session_id, 3, PEPPER);
        mechanics::finish_round(session_id, 3);

        // fast forward to start the next round
        timestamp::fast_forward_seconds(60);

        // fifth round
        mechanics::submit_first_decision(
            alice,
            session_id,
            4,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_last_decision(
            bob,
            session_id,
            4,
            utils::hashed_cooperate(PEPPER)
        );
        mechanics::submit_pepper(session_id, 4, PEPPER);
        mechanics::finish_round(session_id, 4);

        // finish the game
        mechanics::finish_game(session_id);
    }
}