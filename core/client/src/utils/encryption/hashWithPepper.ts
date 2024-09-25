import { blake2b } from 'blakejs';
import { generatePepper } from './generatePepper'; // Ensure this function exists and returns a pepper

/**
 * Hashes the input with a generated pepper and returns both.
 * @param input The input string to hash.
 * @returns An object containing the hash and the pepper.
 */
export const hashWithPepper = (input: string): { hash: string; pepper: string } => {
  const pepper = generatePepper(); // Generates a random pepper
  const inputWithPepper = input + pepper; // Concatenate input and pepper
  const hash = blake2b(inputWithPepper, undefined, 32); // Hash using Blake2b
  const hashString = Buffer.from(hash).toString('hex'); // Convert to hex string

  return { hash: hashString, pepper }; // Return both hash and pepper
};