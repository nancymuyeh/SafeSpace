import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5433';
const dbPassword = process.env.DB_PASSWORD || 'mysecretpassword';
const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'postgres';

const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrations applied');
  process.exit(0);
}

main();
