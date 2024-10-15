module trust_16::utils {
    use aptos_std::aptos_hash;
    use std::vector;

    #[view]
    public fun hashed_cooperate(pepper: vector<u8>): vector<u8> {
        // true for cooperate
        vector::append(&mut pepper, vector[1]);
        aptos_hash::blake2b_256(pepper)
    }

    #[view]
    public fun hashed_compete(pepper: vector<u8>): vector<u8> {
        // false for compete
        vector::append(&mut pepper, vector[0]);
        aptos_hash::blake2b_256(pepper)
    }
}