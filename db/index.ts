import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Check if we have a database URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Create the connection
const client = postgres(process.env.DATABASE_URL);

// Create the database instance
export const db = drizzle(client, { schema });

// Export the schema as well for convenience
export * from "./schema";
