import { randomBytes } from 'crypto';

export const generatePepper = (length: number = 16): string => {
  return randomBytes(length).toString('hex');
};