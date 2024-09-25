import { randomBytes } from 'crypto';

/**
 * Generate a random pepper.
 * @param length The length of the pepper.
 * @returns The generated pepper.
 */
export const generatePepper = (length: number = 16): string => {
  return randomBytes(length).toString('hex');
};