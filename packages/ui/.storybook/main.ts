import path from 'path'
const { mergeConfig } = require('vite')
import svgr from 'vite-plugin-svgr'

import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
  stories: [{ directory: '../src', files: '**/*.stories.{ts,tsx,mdx}' }],
  addons: [
    path.dirname(require.resolve(path.join('@storybook/addon-links', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-essentials', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-viewport', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-controls', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-actions', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-a11y', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-interactions', 'package.json'))),
  ],
  framework: {
    //@ts-ignore
    name: path.dirname(require.resolve(path.join('@storybook/react-vite', 'package.json'))),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['./assets'],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [svgr()],
    })
  },
}
export default config
