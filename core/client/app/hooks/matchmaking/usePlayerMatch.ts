import { useState } from 'react';
import { Player } from './useMatchMakingQueue';

export function usePlayerMatch() {
    const [matchStarted, setMatchStarted] = useState(false); // Correct useState usage

    // Function to start the match between two players
    function startMatch(player1: Player, player2: Player): void {
        console.log(`Match started between ${player1.id} and ${player2.id}`);
        
        setMatchStarted(true);
    }

    return { startMatch, matchStarted };
}

