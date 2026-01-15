import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Use Docker service name 'db' in Docker environment, localhost for local development
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5433';
const dbPassword = process.env.DB_PASSWORD || 'mysecretpassword';
const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'postgres';

const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const client = postgres(connectionString);
export const db = drizzle(client);
