import { CSSObject, Theme } from '@emotion/react';

import { f } from 'styles';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  {
    paddingTop: '32px',
    paddingBottom: '24px',
    backgroundColor: '#f3f7ff',
  },
];

const headSection = [
  f.flex1,
  f.fullWidth,
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    marginBottom: '16px',

    '& button': {
      height: '28px',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#949DB2',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
  }),
];

const title = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    span: {
      color: '#363E52',
      fontSize: fontSize[18],
      fontWeight: fontWeight[700],
      lineHeight: '28px',
      letterSpacing: '-0.4px',
      marginLeft: '6px',

      b: {
        color: '#004FEC',
        fontSize: fontSize[18],
        fontWeight: fontWeight[700],
        lineHeight: '28px',
        letterSpacing: '-0.4px',
        marginLeft: '4px',
      },
    },
  }),
];

const ul = [
  f.flexColumn,
  {
    gap: '16px',
  },
];

const card_wrap = [
  f.fullWidth,
  f.flexAlignCenter,
  ({
    color: {
      scale: { gray },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: gray[1000],
    borderRadius: '8px',
    boxShadow: '1px 2px 10px 0px rgba(47, 51, 65, 0.03)',
  }),
];

const info_wrap = [f.flexColumn];

const times = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    marginBottom: '8px',

    '& span': {
      color: '#004FEC',
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '6px',
    },
  }),
];

const lesson_name = [
  f.flexColumn,
  ({
    color: {
      scale: { gray },
    },
    typography: { fontSize, fontWeight },
  }: Theme): CSSObject => ({
    marginBottom: '12px',

    '& span': {
      color: gray[0],
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      lineHeight: '24px',
      letterSpacing: '-0.4px',
    },

    '& > div > span': {
      color: '#404040',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '6px',
    },
  }),
];

const package_info = [
  f.flexAlignCenter,
  ({ typography: { fontSize } }: Theme): CSSObject => ({
    '& span': {
      color: '#727B8E',
      fontSize: fontSize[14],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '2px',
    },
  }),
];

const btn = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    justifyContent: 'center',

    height: '34px',
    flexShrink: 0,
    color: '#949DB2',
    fontSize: fontSize[14],
    fontWeight: fontWeight[600],
    lineHeight: '18px',
    letterSpacing: '-0.2px',
    padding: '0 12px',
    borderRadius: '6px',
    border: `1px solid #eaeaea`,
  }),
];

export { wrap, headSection, title, ul, card_wrap, info_wrap, times, lesson_name, package_info, btn };
