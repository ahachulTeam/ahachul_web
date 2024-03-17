import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      primary: { black },
    },
  }: Theme) => ({
    paddingTop: '16px',
    paddingBottom: '24px',
    backgroundColor: black,
  }),
];

const title = [
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray20 },
    },
    typography: {
      size: { heading5 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    marginBottom: '12px',

    b: {
      color: bluegray20,
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
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray40 },
    },
    shadows,
  }: Theme): CSSObject => ({
    padding: '16px',
    border: `2px solid ${bluegray40}`,
    borderRadius: '8px',
    boxShadow: shadows[3],

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
  ({
    color: {
      bluegray: { bluegray80 },
    },
    typography: {
      size: { element4 },
      weight: { regular },
    },
  }: Theme): CSSObject => ({
    marginBottom: '6px',

    '& svg': {
      marginRight: '4px',
    },

    '& p': {
      color: bluegray80,
      fontSize: element4,
      fontWeight: regular,
      lineHeight: '14px',
      letterSpacing: '-0.2px',
    },
  }),
];

const package_name = ({
  color: {
    primary: { white },
  },
  typography: {
    size: { paragraph1 },
    weight: { medium },
  },
}: Theme): CSSObject => ({
  marginBottom: '24px',

  color: white,
  fontSize: paragraph1,
  fontWeight: medium,
  lineHeight: '20px',
  letterSpacing: '-0.4px',
});

const package_price = [
  f.flexAlignCenter,
  ({
    color: {
      primary: { blue },
      bluegray: { bluegray40 },
    },
    typography: {
      size: { paragraph1, element2 },
      weight: { medium, bold },
    },
  }: Theme): CSSObject => ({
    '& span:first-of-type': {
      marginRight: '4px',

      color: blue,
      fontSize: paragraph1,
      fontWeight: bold,
      lineHeight: '24px',
      letterSpacing: '-0.4px',
    },

    '& span:last-of-type': {
      color: bluegray40,
      fontSize: element2,
      fontWeight: medium,
      lineHeight: '21px',
      letterSpacing: '-0.2px',
      textDecorationLine: 'line-through',
    },
  }),
];

export { wrap, title, card_wrap, info_wrap, package_badge, package_name, package_price };
