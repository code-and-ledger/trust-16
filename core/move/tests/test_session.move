/*
    TODO: 
        - Add check functions to ensure the session module's readiness
*/
#[test_only]
module trust_16::test_session {
    use std::signer;
    use trust_16::session;
    use trust_16::test_utils;

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun create_session(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        session::create_session(vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)]);
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun start_session(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        let session_id = session::create_session(vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)]);
        session::start_session(session_id);
    }

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun end_session(aptos_framework: &signer, trust_16: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, alice, bob, charlie);
        let session_id = session::create_session(vector[signer::address_of(alice), signer::address_of(bob), signer::address_of(charlie)]);
        // adding badges to players should happen in the mechanics module
        // doing it manually here for testing purposes
        session::add_badge_to_player(alice, session_id);
        session::add_badge_to_player(bob, session_id);
        session::add_badge_to_player(charlie, session_id);
        
        session::start_session(session_id);
        session::end_session(session_id);
    }
}