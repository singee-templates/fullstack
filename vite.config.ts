import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { nitro } from 'nitro/vite';
import { devtools } from '@tanstack/devtools-vite';

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    devtools(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
});

export default config;
