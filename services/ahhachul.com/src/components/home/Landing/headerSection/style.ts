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
      backgroundColor: '#2E3033',
      borderRadius: '8px',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      color: '#C9CEDC',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      lineHeight: lineHeight[133],
      letterSpacing: '-0.4px',

      '& > span': {
        marginLeft: '4px',
      },

      marginRight: '12px',
    },
  }),
];

export { wrap, btn_wrap };
