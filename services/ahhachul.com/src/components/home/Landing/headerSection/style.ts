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
      height: '32px',
      border: '1.5px solid hsla(0, 0%, 100%, .39)',
      borderRadius: '8px',
      padding: '0 8px',
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
