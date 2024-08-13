import { CSSObject, Theme } from '@emotion/react';

const title = ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  color: gray[1000],
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
});

export { title };
