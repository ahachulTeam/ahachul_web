import '@emotion/react';

import { theme } from './theme';

type DefaultTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends DefaultTheme {}
}
