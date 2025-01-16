import '@emotion/react';

import { theme } from '@/styles';

type DefaultTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends DefaultTheme {}
}
