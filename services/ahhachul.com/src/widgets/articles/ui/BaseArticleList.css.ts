import { Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const ul = {
  '& > li:first-of-type': {
    '& > article': { paddingTop: 0 },
  },

  '& > li:not(:last-of-type)': {
    borderBottom: '1px solid hsla(0, 0%, 100%, .06)',
  },
};

export const empty = [
  cssUtils.flexCenterCenter,
  cssUtils.fullWidth,
  ({
    color: { text },
    typography: { fontSize, fontWeight },
    dimensions: {
      size: { height },
    },
  }: Theme) => ({
    paddingTop: height.header,
    color: text[50],
    fontSize: fontSize[14],
    fontWeight: fontWeight[500],
  }),
];
