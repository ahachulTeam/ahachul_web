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
    paddingTop: '8px',
    paddingBottom: '24px',
    backgroundColor: white,
  }),
];

const title = ({
  color: {
    primary: { blue },
    sub: { gray_2b395d },
  },
  typography: {
    size: { heading2 },
    weight: { bold },
  },
}: Theme): CSSObject => ({
  color: gray_2b395d,
  fontSize: heading2,
  fontWeight: bold,
  lineHeight: '32px',
  letterSpacing: '-0.4px',
  marginBottom: '16px',

  b: {
    display: 'block',
    color: blue,
  },
});

const btn_wrap = [f.fullWidth, f.flexAlignCenter, { marginBottom: '10px' }];

const registCenter = [
  f.flexColumn,
  f.flexAlignCenter,
  f.flexJustifyCenter,
  ({
    color: {
      primary: { black },
      sub: { gray_f0f0f0 },
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
    border: `1px solid ${gray_f0f0f0}`,

    color: black,
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
