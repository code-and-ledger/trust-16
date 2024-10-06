"use client"; // Client component

import { useMatchmakingQueue } from '@/hooks/matchmaking/useMatchMakingQueue';
import React, { useEffect } from 'react';

// Define the Player interface
interface Player {
    id: string;
    latency: number;
    matched?: boolean;
}

const MatchmakingPage = () => {
    const { joinQueue, matchmakingQueue } = useMatchmakingQueue();

    // Example players
    const alice: Player = { id: 'alice', latency: 30 };
    const bob: Player = { id: 'bob', latency: 35 };
    const charlie: Player = { id: 'charlie', latency: 40 };
    const dave: Player = { id: 'dave', latency: 45 };
    const eve: Player = { id: 'eve', latency: 50 };
    const frank: Player = { id: 'frank', latency: 55 };
    const grace: Player = { id: 'grace', latency: 60 };
    const hannah: Player = { id: 'hannah', latency: 65 };
    const isaac: Player = { id: 'isaac', latency: 70 };
    const jack: Player = { id: 'jack', latency: 75 };
    const kate: Player = { id: 'kate', latency: 80 };
    const luke: Player = { id: 'luke', latency: 85 };
    const mike: Player = { id: 'mike', latency: 90 };
    const nancy: Player = { id: 'nancy', latency: 95 };
    const oliver: Player = { id: 'oliver', latency: 100 };
    const peter: Player = { id: 'peter', latency: 105 };

    // Automatically join players into the queue for testing
    useEffect(() => {
        joinQueue(alice);
        setTimeout(() => joinQueue(bob), 500); // joins after 0.5 seconds
        setTimeout(() => joinQueue(charlie), 1000); // joins after 1 second
        setTimeout(() => joinQueue(dave), 2000); // joins after 2 seconds
        setTimeout(() => joinQueue(eve), 3000); // joins after 3 seconds
        setTimeout(() => joinQueue(frank), 4000); // joins after 4 seconds
        setTimeout(() => joinQueue(grace), 5000); // joins after 5 seconds
        setTimeout(() => joinQueue(hannah), 6000); // joins after 6 seconds
        setTimeout(() => joinQueue(isaac), 7000); // joins after 7 seconds
        setTimeout(() => joinQueue(jack), 8000); // joins after 8 seconds
        setTimeout(() => joinQueue(kate), 9000); // joins after 9 seconds
        setTimeout(() => joinQueue(luke), 10000); // joins after 10 seconds
        setTimeout(() => joinQueue(mike), 11000); // joins after 11 seconds
        setTimeout(() => joinQueue(nancy), 12000); // joins after 12 seconds
        setTimeout(() => joinQueue(oliver), 13000); // joins after 13 seconds
        setTimeout(() => joinQueue(peter), 14000); // joins after 14 seconds
    }, []);

    return (
        <div>
            <h1>Matchmaking Queue</h1>
            <h2>Total Players in Queue: {matchmakingQueue.length}</h2> {/* Display total players */}
            <ul>
                {matchmakingQueue.map((player) => (
                    <li key={player.id}>
                        Player {player.id} with latency {player.latency}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchmakingPage;
