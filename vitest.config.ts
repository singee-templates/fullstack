import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      {
        plugins: [
          viteTsConfigPaths({
            projects: ['./tsconfig.json'],
          }),
        ],
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
        },
      },
      {
        plugins: [
          viteTsConfigPaths({
            projects: ['./tsconfig.json'],
          }),
          viteReact(),
        ],
        test: {
          name: 'browser',
          globals: true,
          setupFiles: ['./vitest.browser.setup.ts'],
          include: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
          deps: {
            optimizer: {
              web: {
                enabled: false,
              },
            },
          },
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
