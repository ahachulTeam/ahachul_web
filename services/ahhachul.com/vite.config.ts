import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
    svgr(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
