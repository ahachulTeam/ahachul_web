import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      primary: { white },
    },
  }: Theme) => ({
    paddingTop: '16px',
    paddingBottom: '24px',
    backgroundColor: white,
  }),
];

const title = [
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray90 },
    },
    typography: {
      size: { heading5 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    marginBottom: '12px',

    b: {
      color: bluegray90,
      fontSize: heading5,
      fontWeight: bold,
      lineHeight: '28px',
      letterSpacing: '-0.4px',
      marginLeft: '6px',
    },
  }),
];

const card_wrap = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      sub: { gray_eaeaea },
    },
    shadows,
  }: Theme): CSSObject => ({
    padding: '24px',
    border: `1px solid ${gray_eaeaea}`,
    borderRadius: '8px',
    boxShadow: shadows[3],
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
  ({
    color: {
      sub: { gray_738dc2, gray_3a3c53, red_ff546c },
    },
    typography: {
      size: { element2, heading5 },
      weight: { medium, bold },
    },
  }: Theme): CSSObject => ({
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
        color: gray_738dc2,
        fontSize: element2,
        fontWeight: medium,
        lineHeight: '18px',
        letterSpacing: '-0.2px',
      },

      '& span:last-of-type': {
        color: gray_3a3c53,
        fontSize: heading5,
        fontWeight: bold,
        lineHeight: '28px',
        letterSpacing: '-0.4px',
      },
    },

    '& p': {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',

      fontSize: element2,
      fontWeight: bold,
      lineHeight: '18px',
      letterSpacing: '-0.2px',

      height: '26px',
      color: red_ff546c,
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
  ({
    color: {
      primary: { white },
      bluegray: { bluegray80 },
    },
    typography: {
      size: { paragraph1 },
      weight: { medium },
    },
  }: Theme): CSSObject => ({
    marginTop: '12px',
    color: bluegray80,
    backgroundColor: white,
    fontSize: paragraph1,
    fontWeight: medium,
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
      primary: { blue, white },
    },
    typography: {
      size: { paragraph1 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    height: '48px',
    borderRadius: '8px',
    color: white,
    backgroundColor: blue,

    fontSize: paragraph1,
    fontWeight: bold,
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
