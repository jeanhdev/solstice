import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

dotenv.config();

async function runMigrate() {
  const DATABASE_URL = process.env.DATABASE_URL;

  const migrationClient = postgres(DATABASE_URL as string, { max: 1 });

  const client = drizzle(migrationClient, { logger: true });

  const start = Date.now();

  await migrate(client, {
    migrationsFolder: `${__dirname}/migrations`,
  });

  console.log(`Migrations finished in ${Date.now() - start}ms`);

  process.exit(0);
}

runMigrate().catch((error) => {
  console.log("Error running migrations.");
  console.error(error);
  process.exit(1);
});
