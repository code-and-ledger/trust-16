// utils/encryption/pepperStore.ts
import { connectToDatabase } from '../db';

interface PepperRecord {
  hash: string;
  pepper: string;
}

/**
 * Stores a pepper in the MongoDB database.
 * @param hash The hash of the data.
 * @param pepper The pepper to store.
 */
export const storePepper = async (hash: string, pepper: string): Promise<void> => {
  const client = await connectToDatabase();
  const db = client.db('pepperStoreDB'); // Use your desired database name
  await db.collection('peppers').insertOne({ hash, pepper });
  console.log(`Pepper stored successfully for hash: ${hash}`);
};

/**
 * Retrieves a pepper from the MongoDB database.
 * @param hash The hash of the data.
 * @returns The stored pepper, or undefined if not found.
 */
export const getPepper = async (hash: string): Promise<string | undefined> => {
  const client = await connectToDatabase();
  const db = client.db('pepperStoreDB');
  const record = await db.collection<PepperRecord>('peppers').findOne({ hash });
  if (!record) {
    console.warn(`Pepper not found for hash: ${hash}`);
    return undefined;
  }
  return record.pepper;
};

/**
 * Deletes a pepper from the MongoDB database.
 * @param hash The hash of the data.
 */
export const deletePepper = async (hash: string): Promise<void> => {
  const client = await connectToDatabase();
  const db = client.db('pepperStoreDB');
  await db.collection('peppers').deleteOne({ hash });
  console.log(`Pepper deleted successfully for hash: ${hash}`);
};
