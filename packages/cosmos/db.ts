import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

dotenv.config();

const pool = postgres(process.env.DATABASE_URL as string);

const client = drizzle(pool, { logger: true });

export { client, pool };
