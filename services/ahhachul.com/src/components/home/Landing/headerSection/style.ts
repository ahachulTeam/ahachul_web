import { CSSObject, Theme } from '@emotion/react';
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
    marginBottom: '40px',
    backgroundColor: gray[200],
  }),
];

const title = ({
  color: {
    scale: { gray },
  },
  typography: { fontSize, fontWeight },
}: Theme): CSSObject => ({
  color: gray[1000],
  fontSize: fontSize[18],
  fontWeight: fontWeight[500],
  lineHeight: '32px',
  letterSpacing: '-0.4px',

  b: {
    fontWeight: fontWeight[700],
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
      scale: { gray },
    },
    typography: { fontSize, fontWeight },
  }: Theme): CSSObject => ({
    height: '48px',
    marginRight: '10px',
    padding: '0 12px',
    borderRadius: '8px',
    border: `1px solid #949DB2`,

    color: gray[1000],
    fontSize: fontSize[11],
    fontWeight: fontWeight[500],
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
      scale: { gray, purple },
    },
    typography: { fontSize, fontWeight },
  }: Theme): CSSObject => ({
    height: '48px',
    borderRadius: '8px',
    backgroundColor: purple[900],

    span: {
      color: gray[1000],
      fontSize: fontSize[14],
      fontWeight: fontWeight[600],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginLeft: '8px',
    },
  }),
];

const banner = [
  f.fullWidth,
  f.flexAlignCenter,
  {
    justifyContent: 'space-between',

    height: '58px',
    padding: '0 20px',
    backgroundColor: '#eef4ff',
    borderRadius: '8px',
  },
];

const bannerTextGroup = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  'p:first-of-type': {
    color: '#727B8E',
    fontSize: fontSize[12],
    fontWeight: fontWeight[500],
    lineHeight: '14px',
    letterSpacing: '-0.2px',
  },

  'p:last-of-type': {
    marginTop: '2px',

    color: '#2f5fdc ',
    fontSize: fontSize[11],
    fontWeight: fontWeight[500],
    lineHeight: '18px',
    letterSpacing: '-0.2px',
  },
});

const bannerIcon = {
  '& svg': { width: '16px', height: '16px', transform: 'rotate(180deg)', '& path': { stroke: '#4a93ff' } },
};

export { wrap, title, btn_wrap, registCenter, mobileTicket, banner, bannerTextGroup, bannerIcon };
