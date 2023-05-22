import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withThemeFromJSXProvider } from '@storybook/addon-styling'

import { ThemeProvider, Global } from '@emotion/react'

import { theme, GlobalStyles } from '../src/styles'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    padding: '16px',
    margin: '-1rem',
  },
}

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
]

export default preview
