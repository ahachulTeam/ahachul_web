import { Theme } from '@emotion/react';
import { f } from '@/src/styles';

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
    paddingTop: '14px',
    backgroundColor: gray[200],
  }),
];

const btn_wrap = [
  f.fullWidth,
  f.flexAlignCenter,
  ({
    color: {
      static: {
        dark: { whiteAlpha },
      },
    },
    typography: { fontWeight, lineHeight },
  }: Theme) => ({
    '& > button': {
      height: '36px',
      backgroundColor: whiteAlpha[900],
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      marginRight: '8px',
      padding: '0 12px',

      '& > span': {
        color: '#ffffff',
        fontSize: '13px',
        fontWeight: fontWeight[500],
        lineHeight: lineHeight[133],
        letterSpacing: '-0.4px',
        marginLeft: '6px',
      },

      '& > div': {
        width: '14px',
        height: '14px',

        '& > svg > path': {
          fill: '#ffffff',
          stroke: '#ffffff',
        },
      },
    },
  }),
];

export { wrap, btn_wrap };
