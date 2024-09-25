import { Player } from '../types';

// Validate IP format (basic example)
export const isValidIP = (ip: string): boolean => {
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

// Validate player address format (example: basic check for hexadecimal address)
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Check if a player is valid before adding to the queue
export const isValidPlayer = (player: Player): boolean => {
  return isValidAddress(player.address) && isValidIP(player.ip);
};