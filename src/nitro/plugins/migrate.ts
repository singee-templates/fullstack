import { definePlugin } from 'nitro';
import { runMigrations } from '~db/migrate.ts';

export default definePlugin(async () => {
  await runMigrations();
});
