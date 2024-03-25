import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@nebula/env.mjs";

const globalForDrizzle = globalThis as unknown as {
  client: PostgresJsDatabase;
};

export const client =
  globalForDrizzle.client ||
  drizzle(postgres(env.DATABASE_URL as string), { logger: true });

if (env.NODE_ENV !== "production") globalForDrizzle.client = client;
