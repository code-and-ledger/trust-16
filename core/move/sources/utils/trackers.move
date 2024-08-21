/*
    This module defines the resources used to track whether players have active games or not.

    if a player starts/joins a game, they will be added to a smart table.
    if a player quits a game, they will be removed from the smart table.

    table entries must be unique, so we will use the player's address as the key and the game room id as the value.
*/