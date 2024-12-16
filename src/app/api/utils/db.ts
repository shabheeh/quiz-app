import { MongoClient, Db } from "mongodb";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
const MONGODB_DB: string | undefined = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Cannot find the db connection string in .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Cannot find the db name in .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectDatabase = async () => {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb
    };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  
  cachedClient = client;
  cachedDb = db;

  return { client, db };
};