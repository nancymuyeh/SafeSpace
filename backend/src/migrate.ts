import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = 'postgres://postgres:mysecretpassword@localhost:5433/postgres';
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrations applied');
  process.exit(0);
}

main();
