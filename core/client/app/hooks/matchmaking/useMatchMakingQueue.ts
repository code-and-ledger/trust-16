import { addPlayerToQueue } from '../../services/matchMakingService';
import { Player } from '../../types';
import { useState } from 'react';

const useMatchmakingQueue = () => {
  const [queue, setQueue] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    try {
      addPlayerToQueue(player);
      setQueue(prev => [...prev, player]);
    } catch (error) {
      console.error(error);
    }
  };

  return { queue, addPlayer };
};

export default useMatchmakingQueue;
