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
    paddingTop: '28px',
    paddingBottom: '24px',
    backgroundColor: black,
  }),
];

const title = ({
  color2: {
    scale: { gray },
  },
  typography: {
    size: { heading5 },
    weight: { medium, bold },
    letterSpacing,
  },
}: Theme): CSSObject => ({
  color: gray[1000],
  fontSize: heading5,
  fontWeight: medium,
  lineHeight: '32px',
  letterSpacing: letterSpacing[4],
  marginBottom: '40px',

  b: {
    fontWeight: bold,
  },

  'b:first-of-type': {
    display: 'block',
  },
});

const btn_wrap = [f.fullWidth, f.flexAlignCenter, { marginBottom: '10px' }];

const registCenter = [
  f.flexColumn,
  f.flexAlignCenter,
  f.flexJustifyCenter,
  ({
    color: {
      primary: { white },
      bluegray: { bluegray40 },
    },
    typography: {
      size: { element4 },
      weight: { medium },
    },
  }: Theme): CSSObject => ({
    height: '48px',
    marginRight: '10px',
    padding: '0 12px',
    borderRadius: '8px',
    border: `1px solid ${bluegray40}`,

    color: white,
    fontSize: element4,
    fontWeight: medium,
    lineHeight: '14px',
    letterSpacing: '-0.2px',

    span: {
      marginTop: '2px',
    },
  }),
];

const mobileTicket = [
  f.flex1,
  f.flexAlignCenter,
  f.flexJustifyCenter,
  ({
    color: {
      primary: { white, blue },
    },
    typography: {
      size: { element1 },
      weight: { semibold },
    },
  }: Theme): CSSObject => ({
    height: '48px',
    borderRadius: '8px',
    backgroundColor: blue,

    span: {
      color: white,
      fontSize: element1,
      fontWeight: semibold,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginLeft: '8px',
    },
  }),
];

const banner = [
  f.fullWidth,
  f.flexAlignCenter,
  ({
    color: {
      sub: { gray_eef4ff },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',

    height: '58px',
    padding: '0 20px',
    backgroundColor: gray_eef4ff,
    borderRadius: '8px',
  }),
];

const bannerTextGroup = ({
  color: {
    sub: { blue_2f5fdc },
    bluegray: { bluegray50 },
  },
  typography: {
    size: { element2, element3 },
    weight: { medium },
  },
}: Theme): CSSObject => ({
  'p:first-of-type': {
    color: bluegray50,
    fontSize: element3,
    fontWeight: medium,
    lineHeight: '14px',
    letterSpacing: '-0.2px',
  },

  'p:last-of-type': {
    marginTop: '2px',

    color: blue_2f5fdc,
    fontSize: element2,
    fontWeight: medium,
    lineHeight: '18px',
    letterSpacing: '-0.2px',
  },
});

const bannerIcon = ({
  color: {
    sub: { blue_4a93ff },
  },
}: Theme): CSSObject => ({
  '& svg': { width: '16px', height: '16px', transform: 'rotate(180deg)', '& path': { stroke: blue_4a93ff } },
});

export { wrap, title, btn_wrap, registCenter, mobileTicket, banner, bannerTextGroup, bannerIcon };
