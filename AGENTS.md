# Repository Guidelines for AI

This file provides guidance to AI Code Agent when working with code in this repository.

## Project Structure & Module Organization

Source lives in `src/`. Global routing is defined in `src/router.tsx`, with route modules in `src/routes` (`__root.tsx` for layout, `index.tsx` for the landing page). Shared UI composites belong in `src/components`, design primitives in `src/ui`. Styling overrides sit in `src/styles.css`. Static files stay in `public/`, and production artifacts are written to `dist/` and `.output/`. Colocate new feature assets with the component or route that consumes them to keep dependencies obvious.

- UI: Mantine v8. See `.ai/mantine.md`. Routing: TanStack Start/Router. See `.ai/tanstack-start.md` `.ai/tanstack-router.md`.
- Generated files like `routeTree.gen.ts` are auto-created; do not edit.

## Build & Development Commands

Use pnpm for everything. `pnpm dev` starts the Vite dev server on port 3000 with hot reload. `pnpm build` emits the optimized bundle into `.output/`, while `pnpm preview` runs the Nitro server from `.output/` to sanity-check SSR. `pnpm check:types` runs `tsc --noEmit`. `pnpm lint` applies the TanStack + React ESLint rules, and `pnpm format` runs Prettier then auto-fixes lint errors.

Before declaring any Agent task complete, re-run `pnpm check:types` and `pnpm format` and ensure both commands pass cleanly.

## ESLint

ESLint 9 flat config is used (`eslint.config.js`). The configuration extends `@tanstack/config/eslint` and adds React-specific rules via `eslint-plugin-react`.

Key React rules enforced (errors):

- `react/button-has-type` - buttons must have an explicit `type` attribute
- `react/self-closing-comp` - components without children must self-close
- `react/jsx-curly-brace-presence` - no unnecessary curly braces in JSX
- `react/jsx-boolean-value` - omit `={true}` for boolean props
- `react/jsx-fragments` - use `<>` syntax for fragments
- `react/no-children-prop` - don't pass children as a prop

Run `pnpm lint` to check for errors. ESLint errors are blocking and must be fixed before committing.

## Prettier

Prettier config lives in `prettier.config.js`:

- `semi: true` - always use semicolons
- `singleQuote: true` - use single quotes for strings
- `trailingComma: 'all'` - trailing commas everywhere

Run `pnpm format` to format and fix lint errors in one step (runs Prettier then ESLint --fix).

## Coding Style & Naming Conventions

Write TypeScript React function components. Prettier enforces semicolons, single quotes, and trailing commas—never hand-format around it.

Use PascalCase for components (`DashboardCard.tsx`), camelCase for hooks/utilities. Mantine styles should live beside their component, leveraging Mantine's theming utilities before reaching for raw CSS.

## Commit & Pull Request Guidelines

Commits should mirror the existing short, imperative pattern (`use mantine components for index page`). Keep changes scoped and meaningful. PRs must include: a concise summary, linked issue/ticket, before/after screenshots for UI work, and confirmation that `pnpm lint` and `pnpm check:types` passed. Mention any config or env changes up front so reviewers can reproduce.

## Security & Configuration Tips

Secrets belong in `.env.local` (gitignored); reference them through Vite's `import.meta.env`. Run `lefthook install` once so git hooks catch lint regressions pre-push. Document any third-party scripts or analytics additions in the PR, including CSP or token requirements.

## Notes

1. Prefer Mantine components and styles; avoid unnecessary custom CSS.
2. Extract custom components into the `src/components/` directory (and then you can import them with `~components/`); use CSS Modules for each component's styles.
3. Always use English when writing code, comments, and documentation.

## Dependencies / Tools

### Mantine

The project uses [Mantine](https://mantine.dev/) v8 for UI components. Read .ai/mantine.md for its documentation.

### Tanstack Start

The project uses [Tanstack Start](https://tanstack.com/start/latest/docs/) for routing. Read .ai/tanstack-start.md for its documentation.

And you can use the context7 mcp tool with the library id `/websites/tanstack_com-start-latest` to load (or search) docs.

### Tanstack Router

Tanstack Start uses the Tanstack Router under the hood. Read .ai/tanstack-router.md for its documentation.

And you can use the context7 mcp tool with the library id `/websites/tanstack_router` to load (or search) docs.

### @mantine/hooks

Use [@mantine/hooks](https://mantine.dev/hooks/getting-started/) for common React hooks. Prefer these over writing custom hooks when available.

**Note:** Do NOT use `useClipboard` from @mantine/hooks. Use `copy-to-clipboard` instead (see below).

### copy-to-clipboard

Use [copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard) for clipboard operations:

```tsx
import copy from 'copy-to-clipboard';

copy('Text to copy');
copy(text, { format: 'text/plain' });
```

### @mantine/modals

Use [@mantine/modals](https://mantine.dev/x/modals/) for declarative modal management. The ModalsProvider is already configured in `__root.tsx`.

### dayjs

Use [dayjs](https://day.js.org/) for date manipulation. It's a lightweight alternative to moment.js.

### Zod

Use [Zod](https://zod.dev/) v4 for schema validation. Prefer Zod for form validation and API response parsing.

### Sonner

The project uses [Sonner](https://sonner.emilkowal.ski/) for toast notifications instead of @mantine/notifications. Import `toast` from `sonner` to show notifications:

```tsx
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
toast.warning('Warning message');
toast.loading('Loading...');
toast.promise(promise, {
  loading: 'Loading...',
  success: 'Done!',
  error: 'Error!',
});
```

### Drizzle ORM

The project uses [Drizzle ORM](https://orm.drizzle.team/) with postgres-js for database operations. See `docs/drizzle.md` for details.

- Schema: `src/db/schema.ts`
- Database client: `src/db/db.ts` (import as `import { db, schema } from '~/db'`)
- Migrations: `migrations/` directory

Commands:

- `pnpm db:generate` - Generate migrations from schema changes
- `pnpm db:migrate` - Run migrations
- `pnpm db:seed` - Seed the database
- `pnpm db:studio` - Open Drizzle Studio

Example usage with TanStack Start server functions is available at `src/routes/dynamic.tsx`.

### Context7

If you need to get some other documentations that you don't know exactly, you can use the context7 mcp tool.
