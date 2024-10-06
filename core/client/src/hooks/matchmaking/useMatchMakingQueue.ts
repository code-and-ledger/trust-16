import { useState, useEffect } from 'react';
import { usePlayerMatch } from './usePlayerMatch'; // Import the match hook
import { useGenerateRandomNumber } from './useGenerateRandomNumber'; // Import the random number generator

const MATCH_TIMEOUT = 5; // 5 seconds for match timeout
const MAX_SEARCH_RANGE = 500; // Limit search range expansion
const PLAYER_COUNT_REQUIREMENT = 5; // Minimum players required for a match
const EXPAND_TIME_LIMIT = 20; // 20 seconds before expanding search range
let currentSearchRange = 100; // Starting range for matchmaking

export function useMatchmakingQueue() {
    const [matchmakingQueue, setMatchmakingQueue] = useState<Player[]>([]);
    const { startMatch } = usePlayerMatch(); // Use startMatch from the hook
    const { generateRandomNumber } = useGenerateRandomNumber(); // Use random number generator
    const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null); // Timer to track elapsed time for expanding range

    // Add player to the queue and immediately check for matches
    function joinQueue(player: Player): void {
        setMatchmakingQueue((prevQueue) => {
            const isPlayerInQueue = prevQueue.some((queuedPlayer) => queuedPlayer.id === player.id);

            // Prevent duplicates and ensure the player isn't already matched
            if (!isPlayerInQueue && !player.matched) {
                console.log(`Player ${player.id} joined the queue`);
                const newQueue = [...prevQueue, { ...player, matched: false }];
                checkForMatch(newQueue); // Pass the updated queue to check for matches
                return newQueue;
            }
            return prevQueue;
        });
    }

    // Check if there are enough players to match, else expand search range
    function checkForMatch(queue: Player[]): void {
        const availablePlayers = queue.filter(p => !p.matched);

        // If fewer than PLAYER_COUNT_REQUIREMENT players, extend search range
        if (availablePlayers.length < PLAYER_COUNT_REQUIREMENT) {
            console.log(`Expanding search range to: ${currentSearchRange}`);
            expandSearchRange(queue);
            return;
        }

        if (availablePlayers.length >= 2) {
            // Randomly select two players from available players
            const firstPlayerIndex = generateRandomNumber(0, availablePlayers.length);
            let secondPlayerIndex = generateRandomNumber(0, availablePlayers.length);

            // Ensure the second player is not the same as the first
            while (secondPlayerIndex === firstPlayerIndex) {
                secondPlayerIndex = generateRandomNumber(0, availablePlayers.length);
            }

            const player1 = availablePlayers[firstPlayerIndex];
            const player2 = availablePlayers[secondPlayerIndex];

            // Log the match
            console.log(`%cMatched players: ${player1.id} vs ${player2.id}`, 'color: green; font-weight: bold;'); // Highlight the match in green in console
            startMatch(player1, player2); // Start match with these two players

            // Mark both players as matched
            player1.matched = true;
            player2.matched = true;

            // Remove matched players from the queue
            setMatchmakingQueue(prevQueue => {
                const updatedQueue = prevQueue.filter(p => p.id !== player1.id && p.id !== player2.id);
                console.log(`Player ${player1.id} and ${player2.id} removed from the queue after being matched.`);
                return updatedQueue;
            });
        } else {
            console.log('No match found, expanding search range...');
            setTimeout(() => expandSearchRange(queue), MATCH_TIMEOUT);
        }
    }

    // Expand the search range and try matching again
    function expandSearchRange(queue: Player[]): void {
        if (currentSearchRange >= MAX_SEARCH_RANGE) {
            console.log('Max search range reached. No match available.');
            return;
        }

        currentSearchRange += 50;
        console.log(`Expanded search range to: ${currentSearchRange}`);
        checkForMatch(queue); // Recheck the queue with the expanded range
    }

    // Effect to handle the expansion of search range after a set time
    useEffect(() => {
        if (matchmakingQueue.length >= PLAYER_COUNT_REQUIREMENT) {
            // Start a timer to expand search range if no match within EXPAND_TIME_LIMIT
            if (!searchTimer) {
                const timer = setTimeout(() => {
                    console.log('Expanding search range due to timeout.');
                    expandSearchRange(matchmakingQueue);
                }, EXPAND_TIME_LIMIT * 1000);
                setSearchTimer(timer); // Set the timer
            }
        }
    }, [matchmakingQueue]);

    return { joinQueue, matchmakingQueue };
}

// Updated Player interface with matched flag
export interface Player {
    id: string;
    latency: number;
    matched?: boolean; // indicates if the player has been matched
}