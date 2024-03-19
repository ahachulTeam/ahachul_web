import { CSSObject, Theme } from '@emotion/react';

const title = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
});

export { title };
