import { useState } from 'react';

// Hook for generating a random number between a range
export function useGenerateRandomNumber() {
    const [randomNumber, setRandomNumber] = useState<number | null>(null);

    // Function to generate random number between min_incl and max_excl
    function generateRandomNumber(min: number, max: number): number {
        const randomValue = Math.floor(Math.random() * (max - min)) + min;
        setRandomNumber(randomValue);
        return randomValue;
    }

    return { randomNumber, generateRandomNumber };
}
