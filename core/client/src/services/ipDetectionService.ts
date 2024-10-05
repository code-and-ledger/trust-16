import { playersQueue } from "./matchMakingService";

export const detectSameIP = (ip: string): boolean => {
  return playersQueue.some(player => player.ip === ip);
};
