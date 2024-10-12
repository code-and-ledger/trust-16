module trust_16::utils {
    use aptos_framework::randomness;
    use aptos_std::aptos_hash;
    use std::vector;

    /// The number is not in the range
    const ENOT_IN_RANGE: u64 = 1;

    /// Checks if vectors `x` and `y` contain the same elements and have the same length.
    public fun compare_vectors<Element: copy + drop>(x: &vector<Element>, y: &vector<Element>): bool {
        // Check if lengths are equal
        let len_x = vector::length(x);
        let len_y = vector::length(y);
        if (len_x != len_y) {
            return false
        };

        // Sort both vectors (if you have a sorting mechanism) to compare
        let sorted_x = vector::slice(x, 0, len_x);  // Copy x to sorted_x
        let sorted_y = vector::slice(y, 0, len_y);  // Copy y to sorted_y
        vector::reverse(&mut sorted_x); // Simulating a sort step, use actual sorting logic if available
        vector::reverse(&mut sorted_y); // Simulating a sort step, use actual sorting logic if available

        // Compare each element in the sorted vectors using `zip_ref`
        let are_equal = true;
        vector::zip_ref(&sorted_x, &sorted_y, |x_elem, y_elem| {
            if (!are_equal || x_elem != y_elem) {
                are_equal = false;
            }
        });

        are_equal
    }

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

    // TODO: remove before production
    #[deprecated]
    #[view]
    /// Generates a random u256 in the range [min, max]
    /// Used for randomly selecting players for matchmaking
    #[lint::allow_unsafe_randomness]
    public fun generate_u46_in_range(min: u64, max: u64): u64 {
        assert!(min <= max, ENOT_IN_RANGE);
        randomness::u64_range(min, max)
    }
}