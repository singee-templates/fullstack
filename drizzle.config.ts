import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error('environment variable DATABASE_URL is required');
}

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
  schema: './src/db/schema.ts',
  casing: 'snake_case',
  out: './migrations',
});
