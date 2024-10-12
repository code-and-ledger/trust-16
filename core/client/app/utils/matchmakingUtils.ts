import { Player, Match } from '../types';

// Check if a player is already in the queue
export const isPlayerInQueue = (queue: Player[], playerAddress: string): boolean => {
  return queue.some(player => player.address === playerAddress);
};

// Create a new match object
export const createMatch = (player1: Player, player2: Player): Match => {
  return { player1, player2, createdAt: new Date() };
};
