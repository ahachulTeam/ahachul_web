import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const top = [
  f.fullWidth,
  f.flexAlignCenter,
  f.posRel,
  ({
    color: {
      primary: { white, black },
    },
    typography: {
      size: { heading5 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    height: '55px',
    backgroundColor: white,
    justifyContent: 'space-between',
    padding: '0 24px',

    '& > span': {
      color: black,
      fontSize: heading5,
      fontWeight: bold,
      lineHeight: '22.54px',
      letterSpacing: '-1%',
    },

    '& > div > svg > g > path': {
      fill: black,
    },
  }),
];

const content = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      sub: { blue_3477fe },
    },
  }: Theme): CSSObject => ({
    height: '375px',
    backgroundColor: blue_3477fe,
    padding: '0 34px',
  }),
];

export { top, content };
