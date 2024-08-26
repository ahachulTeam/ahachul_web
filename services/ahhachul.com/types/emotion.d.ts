import '@emotion/react';
import themes from 'shared/themes.css';

type CustomTheme = typeof themes;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
