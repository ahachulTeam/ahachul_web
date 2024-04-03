import { Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({
    paddingTop: '28px',
    backgroundColor: gray[200],
  }),
];

const btn_wrap = [
  f.fullWidth,
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight, lineHeight } }: Theme) => ({
    '& > button': {
      height: '36px',
      backgroundColor: 'hsla(0, 0%, 100%, .19)',
      borderRadius: '8px',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      color: '#e6e6e6',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      lineHeight: lineHeight[133],
      letterSpacing: '-0.4px',

      '& > span': {
        marginLeft: '4px',
      },

      marginRight: '8px',
    },
  }),
];

export { wrap, btn_wrap };
