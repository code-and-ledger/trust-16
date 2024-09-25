import { Player, Match } from '../types';
import { detectSameIP } from './ipDetectionService';
import { createMatch, isPlayerInQueue } from '../utils/matchmakingUtils';
import { isValidPlayer } from '../utils/validationUtils';

export const playersQueue: Player[] = []; // Queue of players waiting for a match
const ongoingMatches: Match[] = []; // List of ongoing matches

export const addPlayerToQueue = (player: Player): void => {
  if (!isValidPlayer(player)) {
    throw new Error('Invalid player data.');
  }

  if (isPlayerInQueue(playersQueue, player.address)) {
    throw new Error('Player is already in the queue.');
  }

  if (detectSameIP(player.ip)) {
    throw new Error('Player with the same IP already in queue.');
  }

  playersQueue.push(player);
};

export const findMatch = (): Match | null => {
  if (playersQueue.length < 2) return null;

  const player1 = playersQueue.shift();
  const player2 = playersQueue.shift();

  if (player1 && player2) {
    const match = createMatch(player1, player2);
    ongoingMatches.push(match);
    return match;
  }

  return null;
};
