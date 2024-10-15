/*
    This module defines an admin, set previliges, and manage main settings

    There are several types of admins:
    - Super admin: Can do anything- set other admins, change settings, etc.
    - Game admin: Can create and manage games (bots)
*/

module trust_16::admin {
    use trust_16::rewards_pool;
    use trust_16::session;

    // ---------------
    // Entry Functions
    // ---------------

    fun init_module(deployer: &signer) {
        // init rewards pool
        rewards_pool::init(deployer);
        // init session
        session::init(deployer);
    }
}