/*
    This module defines the data strcuture for a trait.

    A trait is a predefined pattern of decisions that a player makes, where each representing different strategic approaches and playstyles.

    lifecycle: 
    - Getting the last x decisions from a player and storing them in a vector
    - Comparing the vector with the defined traits patterns to determine the player's trait

    TODO: 
        - Traits should be defined and can be adjusted
        - There should be functions to compare the player's decisions with the traits
        
*/

module trust_16::traits {
    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::fungible_asset::{Self, Metadata, FungibleAsset};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::smart_vector::{Self, SmartVector};
    use aptos_framework::timestamp;
    use aptos_std::option::{Self, Option};
    use std::signer;
    use std::vector;

    // ---------
    // Constants
    // ---------



    // ------
    // Errors
    // ------



    // ---------
    // Resources
    // ---------


    // ------
    // Events
    // ------

    

    // ----------------
    // Public Functions
    // ----------------



    // ----------------
    // Helper Functions
    // ----------------



    // --------------
    // View Functions
    // --------------



    // ---------
    // Unit Test
    // ---------

}

