# Fullstack Template

A modern, production-ready React template with Mantine UI, TanStack Start, and TypeScript. Perfect for building full-stack web applications with server-side rendering, beautiful UI components, and type-safe routing.

## ✨ Features

- **🎨 Mantine v8** - A full-featured React components library with 100+ customizable components
- **🚀 TanStack Start** - Full-stack React framework with SSR and file-based routing
- **📦 TanStack Router** - Type-safe routing with automatic code splitting
- **🔄 TanStack Query** - Powerful data fetching and caching
- **📊 TanStack Table** - Headless table utilities for building powerful tables
- **⚡ Vite** - Lightning fast build tool with HMR
- **🔷 TypeScript** - Full type safety and IntelliSense support
- **🎭 Vitest** - Fast unit testing with React Testing Library
- **💅 PostCSS** - Advanced CSS processing with Mantine preset
- **📝 ESLint & Prettier** - Code quality and formatting
- **🔄 GitHub Actions** - CI/CD pipeline ready
- **🎯 Path Aliases** - Clean imports with `~` prefix
- **🌐 SSR Ready** - Server-side rendering with Nitro
- **🗄️ Drizzle ORM** - TypeScript ORM with postgres-js
- **🔔 Sonner** - Beautiful toast notifications
- **📋 Zod v4** - TypeScript-first schema validation
- **📅 Day.js** - Lightweight date manipulation
- **🎨 Tabler Icons** - Beautiful SVG icons

## 🚀 Quick Start

### Use this template

Click the "Use this template" button above or use the GitHub CLI:

```bash
gh repo create my-app --template singee-templates/fullstack
```

Read the docs dir for more information. (You can safely delete this README.md file and docs directory after cloning as they are not needed for your project.)

### Prerequisites

- Node.js >= 22
- pnpm 10+

### Local Development

1. **Clone and install dependencies:**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
pnpm install
```

2. **Start development server:**

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
.
├── src/
│   ├── components/         # Shared React components
│   │   ├── demo/           # Example components (safe to delete)
│   │   └── system/         # System components (404, etc.)
│   ├── routes/             # File-based routing
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Home page
│   │   └── 404.tsx         # 404 page
│   ├── ui/                 # Design system and themes
│   ├── db/                 # Database schema and client
│   ├── nitro/              # Nitro server plugins
│   ├── router.tsx          # Router configuration
│   ├── routeTree.gen.ts    # Auto-generated route tree (do not edit manually)
│   └── styles.css          # Global styles
├── migrations/             # Drizzle database migrations
├── scripts/                # Utility scripts (db seed, etc.)
├── public/                 # Static assets
├── .ai/                    # AI documentation for development
├── .github/                # GitHub templates and workflows
├── Dockerfile              # Docker configuration
├── AGENTS.md               # AI assistant guidelines
└── CLAUDE.md               # Symlink to AGENTS.md
```

## 🔐 Environment Configuration

This template uses environment variables for configuration. Here's how the environment files work:

### Files Overview

| File           | Purpose                                                             | Git tracked |
| -------------- | ------------------------------------------------------------------- | ----------- |
| `.env.example` | Template file with all available environment variables              | Yes         |
| `.env`         | Your local environment variables with actual values                 | No          |
| `.envrc`       | [direnv](https://direnv.net/) configuration for auto-loading `.env` | Yes         |

### Usage in Code

In client code, you need to use vite's `import.meta.env` to access environment variables, and in server code, you should use `process.env`.

```tsx
// Client-side (must be prefixed with VITE_)
const apiUrl = import.meta.env.VITE_API_URL;

// Server-side (in loaders, actions, etc.)
const secretKey = process.env.SECRET_KEY;
```

> **Note:** Only variables prefixed with `VITE_` are exposed to the client-side code. Keep sensitive values without this prefix.

## 📦 Available Scripts

| Script                     | Description                           |
| -------------------------- | ------------------------------------- |
| `pnpm dev`                 | Start development server on port 3000 |
| `pnpm build`               | Build for production                  |
| `pnpm preview`             | Preview production build              |
| `pnpm test`                | Run tests                             |
| `pnpm test --watch`        | Run tests in watch mode               |
| `pnpm lint`                | Run ESLint                            |
| `pnpm format`              | Format code with Prettier and ESLint  |
| `pnpm check:types`         | Type check with TypeScript            |
| `pnpm migrations:generate` | Generate migrations from schema       |
| `pnpm migrations:apply`    | Run database migrations               |
| `pnpm migrations:push`     | Push schema changes directly          |
| `pnpm db:seed`             | Seed the database                     |
| `pnpm drizzle:studio`      | Open Drizzle Studio                   |

## 🛠️ Development

### Adding a New Route

Create a new file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Container>
      <Title>About Us</Title>
    </Container>
  );
}
```

### Using Mantine Components

```tsx
import { Button, Card, Text } from '@mantine/core';

function MyComponent() {
  return (
    <Card>
      <Text>Hello from Mantine!</Text>
      <Button variant="filled">Click me</Button>
    </Card>
  );
}
```

### Custom Components

Place custom components in `src/components/`:

```tsx
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>My Custom Component</div>;
}

// Import with path alias
import { MyComponent } from '~components/MyComponent';
```

## 🧪 Testing

Write tests next to your components:

```tsx
// src/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

Run tests:

```bash
pnpm test          # Run once
pnpm test --watch  # Watch mode
```

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy

Please see the official [Hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) documentation of tanstack-start.

## 🤖 AI Development

This template is optimized for AI-assisted development:

- **AGENTS.md** (and symlinked **CLAUDE.md**) - Guidelines for AI assistants
- **.ai/** - Comprehensive documentation for frameworks (for AI)
- **Type Safety** - Full TypeScript support for better AI suggestions
- **Clear Structure** - Well-organized code for easy understanding

## 📚 Documentation

- [Mantine Documentation](https://mantine.dev/)
- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mantine](https://mantine.dev/) for the amazing component library
- [TanStack](https://tanstack.com/) for the powerful routing and state management tools
- [Vite](https://vitejs.dev/) for the blazing fast build tool

## 💬 Support

- Create an [Issue](https://github.com/singee-templates/fullstack/issues) for bug reports
- Start a [Discussion](https://github.com/singee-templates/fullstack/discussions) for questions
- Check [AGENTS.md](./AGENTS.md) for AI development guidelines

---

Built with ❤️ using Mantine and TanStack Start
