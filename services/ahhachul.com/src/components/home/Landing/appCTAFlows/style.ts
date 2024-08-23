import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { background } }: Theme) => ({
    paddingTop: '14px',
    backgroundColor: background[50],
  }),
];

const btn_wrap: [CSSObject, CSSObject, CSSObject[], ({ color }: Theme) => CSSObject] = [
  f.fullWidth,
  f.overflowScroll,
  f.flexAlignCenter,
  ({ color: { whiteAlpha }, typography: { fontWeight, lineHeight } }: Theme) => ({
    paddingLeft: '20px',
    paddingRight: '20px',
    overflowX: 'scroll',
    overflowY: 'hidden',

    '& > button': {
      flexShrink: 0,
      height: '36px',
      backgroundColor: whiteAlpha[50],
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
