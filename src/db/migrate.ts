import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

export async function runMigrations() {
  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) {
    throw new Error('environment variable DATABASE_URL is not set');
  }

  // Use a separate connection for migrations with max: 1
  const migrationClient = postgres(DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);

  console.log('Running database migrations...');

  try {
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('Database migrations completed successfully');
  } finally {
    await migrationClient.end();
  }
}
