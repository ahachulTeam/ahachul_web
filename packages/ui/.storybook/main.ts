import path from 'path'

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
}
export default config
