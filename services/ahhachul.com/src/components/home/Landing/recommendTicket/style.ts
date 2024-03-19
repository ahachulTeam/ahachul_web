import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      scale: { gray },
    },
  }: Theme) => ({
    paddingTop: '16px',
    paddingBottom: '24px',
    backgroundColor: gray[0],
  }),
];

const title = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    marginBottom: '12px',

    b: {
      color: '#C8CDD9',
      fontSize: fontSize[18],
      fontWeight: fontWeight[700],
      lineHeight: '28px',
      letterSpacing: '-0.4px',
      marginLeft: '6px',
    },
  }),
];

const card_wrap = [
  f.fullWidth,
  f.flexAlignCenter,
  ({ layout: { shadows } }: Theme): CSSObject => ({
    padding: '16px',
    border: `2px solid #949DB2`,
    borderRadius: '8px',
    boxShadow: shadows.md,

    '& img': {
      width: '36%',
      aspectRatio: '1 / 1',
      borderRadius: '8px',
      marginRight: '12px',
    },
  }),
];

const info_wrap = [
  f.flex1,
  f.flexColumn,
  {
    padding: '6px 0',
  },
];

const package_badge = [
  f.flexAlignCenter,
  ({ typography: { fontSize } }: Theme): CSSObject => ({
    marginBottom: '6px',

    '& svg': {
      marginRight: '4px',
    },

    '& p': {
      color: '#4C5874',
      fontSize: fontSize[11],
      lineHeight: '14px',
      letterSpacing: '-0.2px',
    },
  }),
];

const package_name = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize, fontWeight },
}: Theme): CSSObject => ({
  marginBottom: '24px',

  color: gray[1000],
  fontSize: fontSize[16],
  fontWeight: fontWeight[500],
  lineHeight: '20px',
  letterSpacing: '-0.4px',
});

const package_price = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    '& span:first-of-type': {
      marginRight: '4px',

      color: '#004FEC',
      fontSize: fontSize[16],
      fontWeight: fontWeight[700],
      lineHeight: '24px',
      letterSpacing: '-0.4px',
    },

    '& span:last-of-type': {
      color: '#949DB2',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      lineHeight: '21px',
      letterSpacing: '-0.2px',
      textDecorationLine: 'line-through',
    },
  }),
];

export { wrap, title, card_wrap, info_wrap, package_badge, package_name, package_price };
