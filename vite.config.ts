import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { devtools } from '@tanstack/devtools-vite';

const config = defineConfig({
  resolve: {
    alias: {
      tslib: 'tslib/tslib.es6.mjs',
    },
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    tanstackStart(),
    nitro({ noExternals: true }),
    viteReact(),
  ],
  nitro: {
    plugins: ['src/nitro/plugins/migrate.ts'],
  },
});

export default config;
