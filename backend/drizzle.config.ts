import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
  },
} satisfies Config;
