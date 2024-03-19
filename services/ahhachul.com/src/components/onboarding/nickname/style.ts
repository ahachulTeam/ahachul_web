import { CSSObject, Theme } from '@emotion/react';

const pageTitle = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[700],
  lineHeight: '1.3',
  margin: '100px 0 60px',
  alignSelf: 'flex-start',
});

const title = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[11],
  fontWeight: fontWeight[700],
  lineHeight: '1.3',
  alignSelf: 'flex-start',
});

const subTitle = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[11],
  fontWeight: fontWeight[600],
  lineHeight: '1.3',
  margin: '8px 0 36px',
  alignSelf: 'flex-start',
});

const wrap = {};

export { wrap, pageTitle, title, subTitle };
