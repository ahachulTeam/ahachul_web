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
            'removeDimensions',
            'minifyStyles',
            'removeComments',
            'removeHiddenElems',
            'removeEmptyAttrs',
            'removeEmptyText',
            'removeEmptyContainers',
            'collapseGroups',
            'removeMetadata',
            {
              name: 'convertPathData',
              params: {
                floatPrecision: 2,
              },
            },
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
