/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stackflow: '/src/stackflow',
      pages: '/src/pages',
      components: '/src/components',
      mocks: '/src/mocks',
      utils: '/src/utils',
      providers: '/src/providers',
      data: '/src/data',
      stores: '/src/stores',
      static: '/src/static',
      styles: '/src/styles',
      hooks: '/src/hooks',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['/node_modules/', '/build/'],
    setupFiles: './vitest.setup.ts',
  },
});
