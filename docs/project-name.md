# Project Name

Use this checklist when initializing a new repository from this template and
renaming it from the template identity to the real project identity.

## Names to Decide First

Decide these values before editing files:

- Repository slug: the GitHub repository name, for example `my-app`.
- Package name: the `package.json` name, for example `my-app` or
  `@your-org/my-app`.
- Product name: the human-readable application name shown in browser metadata,
  PWA metadata, README text, screenshots, and docs.
- Public URL: the production origin, for example `https://my-app.example.com`.
- Local database name: the database name used in local development, for example
  `my_app`.

## Required Changes

Update these files during project initialization:

| File                    | What to change                                                                                                                                                                               | Why                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `package.json`          | Change `name` from `@singee-templates/fullstack` to the real package name.                                                                                                                   | This is the package/workspace identity used by package managers, tooling, and dependency metadata. |
| `README.md`             | Replace the template title, template usage command, clone URL, repository links, and support links with the real project name and repository.                                                | The README is usually the first external-facing project description.                               |
| `src/routes/__root.tsx` | Replace the `head()` title value (`TanStack Start Starter`) with the real product name.                                                                                                      | This controls the browser tab title and page metadata.                                             |
| `public/manifest.json`  | Replace `short_name` and `name` with the real product name.                                                                                                                                  | This controls PWA install metadata and app names shown by browsers.                                |
| `.env.example`          | Change the sample `DATABASE_URL` database name from `project` to the real local database name. Change `BETTER_AUTH_URL` if the default local URL is not correct for the initialized project. | This keeps copied environment files aligned with the initialized project.                          |

After changing `package.json`, run:

```bash
pnpm install
```

Do not edit `pnpm-lock.yaml` by hand. Let pnpm update it if the package metadata
change affects the lockfile.

## Branding Assets

Replace these files when the initialized project has its own branding:

| File                 | What to change     |
| -------------------- | ------------------ |
| `public/favicon.ico` | Browser favicon.   |
| `public/logo192.png` | PWA icon at 192px. |
| `public/logo512.png` | PWA icon at 512px. |

If the product uses a different brand color, also update `theme_color` and
`background_color` in `public/manifest.json`.

## Deployment and CI

Check these files before the first deployment:

| File                           | What to check                                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/docker.yml` | `IMAGE_NAME` defaults to `${{ github.repository }}`, so it follows the new GitHub repository automatically. Change it only if the image should be published under a different name. |
| `.github/workflows/ci.yml`     | No project name is hardcoded. Rename the workflow only if the project needs a custom workflow title.                                                                                |
| `Dockerfile`                   | No project name is hardcoded. No rename change is needed.                                                                                                                           |

## Optional Cleanup

These are not required for application correctness, but are often cleaned up
during initialization:

- Rewrite or delete template-only documentation after the project has its own
  docs. The current `README.md` says the template docs can be deleted after
  cloning.
- Remove demo routes, demo components, seed data, and demo database tables if
  the real project does not need them.
- Regenerate local IDE metadata instead of preserving template-specific `.idea`
  files. Some IDE files can contain the old directory name `fullstack`, but they
  are local editor state, not application configuration.

## What Not to Rename Blindly

Do not treat every `name` field as the project name. Many of them are unrelated
schema columns, test project names, chart series names, demo user names, or
workflow step names.

Generated files should not be edited manually:

- `src/routeTree.gen.ts`
- `src/db/auth-schema.ts`
- `migrations/meta/*.json`
- `pnpm-lock.yaml`

Regenerate them through their owning tools only when the underlying source has
changed.

## Verification

Run these commands after the rename:

```bash
pnpm check:types
pnpm format
pnpm build
```

Then search for leftover template identity strings:

```bash
rg -n \
  "@singee-templates/fullstack|singee-templates/fullstack|Fullstack Template|TanStack Start Starter|TanStack App|Create TanStack App Sample|your-username|your-repo|my-app" \
  -S \
  package.json README.md src public .github docs
```

Leftover matches in this document are expected while the repository is still a
template. In an initialized project, they should usually be gone from
application and public-facing files.
