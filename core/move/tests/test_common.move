/*
    TODO: 
        - 
*/
#[test_only]
module trust_16::test_common {
    use aptos_framework::timestamp;
    use aptos_std::simple_map::{Self, SimpleMap};
    use std::debug;
    use std::signer;
    use std::string::{Self, String};
    use trust_16::mechanics;
    use trust_16::session;
    use trust_16::test_utils;
    use trust_16::utils;

    const PEPPER: vector<u8> = b"trust_test";

    #[test(aptos_framework = @0x1, trust_16 = @trust_16, session_manager = @session_manager, alice = @0x111, bob = @0x222, charlie = @0x333)]
    public fun generate_u46_in_range(aptos_framework: &signer, trust_16: &signer, session_manager: &signer, alice: &signer, bob: &signer, charlie: &signer) {
        test_utils::setup_test(aptos_framework, trust_16, session_manager, alice, bob, charlie);
        let generated = utils::generate_u46_in_range(0, 100);
        debug::print<u64>(&generated);
        // move forward with 1 second
        timestamp::fast_forward_seconds(1);
        let generated2 = utils::generate_u46_in_range(0, 100);
        debug::print<u64>(&generated2);
    }
}