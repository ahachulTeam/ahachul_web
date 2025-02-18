import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false,
                  removeUselessStrokeAndFill: false,
                  cleanupIds: false,
                  convertPathData: false,
                },
              },
            },
            'sortAttrs',
            'removeXMLProcInst',
            'removeXMLNS',
            'minifyStyles',
            'removeComments',
            'removeHiddenElems',
            'removeEmptyAttrs',
            'removeEmptyText',
            'removeEmptyContainers',
            'collapseGroups',
            'removeMetadata',
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
              },
            },
          ],
        },
      },
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp)$/i,
    }),
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
    rollupOptions: {
      output: {
        manualChunks: {
          auth: [
            './src/pages/auth/login',
            './src/pages/auth/set-nickname',
            './src/pages/auth/callback',
          ],
          community: [
            './src/pages/community/page',
            './src/pages/community/new',
            './src/pages/community/[id]/edit',
            './src/pages/community/[id]/page',
          ],
          'lost-found': [
            './src/pages/lostFound/page',
            './src/pages/lostFound/new',
            './src/pages/lostFound/[id]/edit',
            './src/pages/lostFound/[id]/page',
          ],
          complaint: [
            './src/pages/complaint/page',
            './src/pages/complaint/new',
            './src/pages/complaint/list',
            './src/pages/complaint/[id]/edit',
            './src/pages/complaint/[id]/page',
          ],
          talk: [
            './src/pages/talk/page',
            './src/pages/talk/setting',
            './src/pages/talk/[talkId]/page',
          ],
          notification: ['./src/pages/notification/page', './src/pages/notification/setting'],
          comment: [
            './src/pages/comment/[commentId]/edit',
            './src/pages/comment/[commentId]/reply',
          ],
          my: ['./src/pages/my/page', './src/pages/my/setting'],
        },
      },
    },
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
