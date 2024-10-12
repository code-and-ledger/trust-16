// utils/db.ts
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || ''; // Use the URI from the .env file

if (!uri) {
  throw new Error('MongoDB connection string is missing. Please add it to the .env file.');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Use a singleton pattern to ensure only one instance of the client is used
let dbInstance: MongoClient | null = null;

export const connectToDatabase = async (): Promise<MongoClient> => {
  if (!dbInstance) {
    try {
      await client.connect();
      dbInstance = client;
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }
  return dbInstance;
};
