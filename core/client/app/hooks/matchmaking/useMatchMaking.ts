import { addPlayerToQueue, findMatch } from '../../services/matchMakingService';
import { Match, Player } from '../../types';
import { useState, useEffect } from 'react';

const useMatchmaking = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [match, setMatch] = useState<Match | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const startMatchmaking = (player: Player) => {
    setIsSearching(true);
    try {
      addPlayerToQueue(player);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (isSearching) {
      const searchInterval = setInterval(() => {
        const foundMatch = findMatch();
        if (foundMatch) {
          setMatch(foundMatch);
          setIsSearching(false);
        }
      }, 1000); // Check for match every second

      return () => clearInterval(searchInterval);
    }
  }, [isSearching]);

  return { match, startMatchmaking, isSearching };
};

export default useMatchmaking;