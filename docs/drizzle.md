# Drizzle

This template uses [drizzle-orm](https://github.com/drizzle-orm/drizzle-orm) with postgres-js.

It contains a simple demo schema and migration files now. You should delete them and add your own in most cases.

- Migration files are located in `migrations` directory.
- Schema is located in `src/db/schema.ts`.

You can delete the `migrations` directory and edit the schema file to fit your needs. Then execute `pnpm migrations:generate` to generate new migration files.

## Auto Migration

Migrations are automatically executed when the server starts via a Nitro plugin (`src/nitro/plugins/migrate.ts`). This ensures your database schema is always up to date.

The migration logic is in `src/db/migrate.ts` and can also be called manually if needed.

Note: You may not want to run migrations automatically in production. In that case, you can remove the plugin file and definition (in `vite.config.ts`).

## Example Page

There is a demo CRUD page at `src/routes/dynamic.tsx` (accessible via `/dynamic`) that demonstrates how to use Drizzle with TanStack Start's server functions. It includes:

- Server functions for querying, creating, and deleting records
- Using `loader` to fetch data on the server
- Using `useServerFn` to call server functions from components
- Modal-based form for creating new items
- Delete confirmation dialog
