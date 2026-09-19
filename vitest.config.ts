import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
        },
      },
      {
        resolve: {
          tsconfigPaths: true,
        },
        plugins: [viteReact()],
        optimizeDeps: {
          // Prebundle component dependencies to prevent reloads during tests.
          include: [
            '@mantine/core',
            '@tabler/icons-react',
            '@tanstack/react-table',
            'vitest-browser-react',
          ],
        },
        test: {
          name: 'browser',
          globals: true,
          setupFiles: ['./vitest.browser.setup.ts'],
          include: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
            headless: true,
            viewport: {
              width: 1280,
              height: 720,
            },
            screenshotFailures: true,
          },
        },
      },
    ],
  },
});
