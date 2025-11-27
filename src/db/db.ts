import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from './schema';

export { schema };

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error('environment variable DATABASE_URL is not set');
}

export const db = drizzle({
  connection: DATABASE_URL,
  schema,
  casing: 'snake_case',
  logger: process.env.NODE_ENV === 'development',
});

export type DB = typeof db;
export type TX = Parameters<Parameters<DB['transaction']>[0]>[0];
