import { CSSObject, Theme } from '@emotion/react';
import { f } from 'shared/style';

const top = [
  f.fullWidth,
  f.flexAlignCenter,
  f.posRel,
  ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    height: '55px',
    backgroundColor: gray[1000],
    justifyContent: 'space-between',
    padding: '0 24px',

    '& > span': {
      color: gray[0],
      fontSize: fontSize[18],
      fontWeight: fontWeight[700],
      lineHeight: '22.54px',
      letterSpacing: '-1%',
    },

    '& > div > svg > g > path': {
      fill: gray[0],
    },
  }),
];

const content = [
  f.fullWidth,
  f.flexColumn,
  {
    height: '375px',
    backgroundColor: '#3477fe',
    padding: '0 34px',
  },
];

export { top, content };
