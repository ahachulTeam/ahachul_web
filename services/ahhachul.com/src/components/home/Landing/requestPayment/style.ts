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
  f.flexColumn,
  ({ layout: { shadows } }: Theme): CSSObject => ({
    padding: '24px',
    border: `2px solid #949DB2`,
    borderRadius: '8px',
    boxShadow: shadows.md,
  }),
];

const info_wrap = [
  f.fullWidth,
  f.flexColumn,
  f.flexAlignCenter,
  {
    marginBottom: '20px',
  },
];

const payment_info = [
  f.fullWidth,
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    position: 'relative',
    height: '48px',
    marginBottom: '12px',

    '& img': {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      marginRight: '10px',
      overflow: 'hidden',
    },

    '& div': {
      display: 'flex',
      flexDirection: 'column',

      '& span:first-of-type': {
        color: '#738dc2',
        fontSize: fontSize[14],
        fontWeight: fontWeight[500],
        lineHeight: '18px',
        letterSpacing: '-0.2px',
      },

      '& span:last-of-type': {
        color: '#3a3c53',
        fontSize: fontSize[18],
        fontWeight: fontWeight[700],
        lineHeight: '28px',
        letterSpacing: '-0.4px',
      },
    },

    '& p': {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',

      fontSize: fontSize[14],
      fontWeight: fontWeight[700],
      lineHeight: '18px',
      letterSpacing: '-0.2px',

      height: '26px',
      color: '#ff546c',
      backgroundColor: 'rgba(255, 84, 108, 0.10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 10px',
      borderRadius: '6px',
    },
  }),
];

const resson_info = [
  f.fullWidth,
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    marginTop: '12px',
    color: '#4C5874',
    fontSize: fontSize[16],
    fontWeight: fontWeight[500],
    lineHeight: '24px',
    letterSpacing: '-0.4px',
  }),
];

const bpay = [
  f.fullWidth,
  f.flexAlignCenter,
  f.flexJustifyCenter,
  ({
    color: {
      scale: { gray },
    },
    typography: { fontSize, fontWeight },
  }: Theme): CSSObject => ({
    height: '48px',
    borderRadius: '8px',
    color: gray[1000],
    backgroundColor: '#004FEC',

    fontSize: fontSize[16],
    fontWeight: fontWeight[700],
    lineHeight: '24px',
    letterSpacing: '-0.4px',

    span: {
      marginLeft: '10px',
    },
  }),
];

const paymentIcon = {
  '& > svg': {
    width: '24px',
    height: '24px',
  },
};

export { wrap, title, card_wrap, info_wrap, payment_info, resson_info, bpay, paymentIcon };
