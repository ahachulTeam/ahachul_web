import { CSSObject, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const cheerUpPhrase = [
  cssUtils.sideGutter,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    color: text[50],
    fontSize: fontSize[18],
    fontWeight: fontWeight[500],
    lineHeight: '32px',
    letterSpacing: '-0.4px',

    b: {
      fontWeight: fontWeight[700],
    },

    'b:first-of-type': {
      display: 'block',
    },
  }),
];
