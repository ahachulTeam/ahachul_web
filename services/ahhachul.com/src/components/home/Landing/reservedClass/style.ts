import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      sub: { gray_f3f7ff },
    },
  }: Theme): CSSObject => ({
    paddingTop: '32px',
    paddingBottom: '24px',
    backgroundColor: gray_f3f7ff,
  }),
];

const headSection = [
  f.flex1,
  f.fullWidth,
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray40 },
    },
    typography: {
      size: { paragraph2 },
      weight: { medium },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    marginBottom: '16px',

    '& button': {
      height: '28px',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: bluegray40,
      fontSize: paragraph2,
      fontWeight: medium,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
  }),
];

const title = [
  f.flexAlignCenter,
  ({
    color: {
      primary: { blue },
      bluegray: { bluegray90 },
    },
    typography: {
      size: { heading5 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    span: {
      color: bluegray90,
      fontSize: heading5,
      fontWeight: bold,
      lineHeight: '28px',
      letterSpacing: '-0.4px',
      marginLeft: '6px',

      b: {
        color: blue,
        fontSize: heading5,
        fontWeight: bold,
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
      primary: { white },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    padding: '16px 20px',
    backgroundColor: white,
    borderRadius: '8px',
    boxShadow: '1px 2px 10px 0px rgba(47, 51, 65, 0.03)',
  }),
];

const info_wrap = [f.flexColumn];

const times = [
  f.flexAlignCenter,
  ({
    color: {
      primary: { blue },
    },
    typography: {
      size: { paragraph2 },
      weight: { semibold },
    },
  }: Theme): CSSObject => ({
    marginBottom: '8px',

    '& span': {
      color: blue,
      fontSize: paragraph2,
      fontWeight: semibold,
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
      primary: { black },
      sub: { gray_404040 },
    },
    typography: {
      size: { paragraph1, paragraph2 },
      weight: { medium, semibold },
    },
  }: Theme): CSSObject => ({
    marginBottom: '12px',

    '& span': {
      color: black,
      fontSize: paragraph1,
      fontWeight: semibold,
      lineHeight: '24px',
      letterSpacing: '-0.4px',
    },

    '& > div > span': {
      color: gray_404040,
      fontSize: paragraph2,
      fontWeight: medium,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '6px',
    },
  }),
];

const package_info = [
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray50 },
    },
    typography: {
      size: { paragraph2 },
      weight: { regular },
    },
  }: Theme): CSSObject => ({
    '& span': {
      color: bluegray50,
      fontSize: paragraph2,
      fontWeight: regular,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '2px',
    },
  }),
];

const btn = [
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray40 },
      sub: { gray_eaeaea },
    },
    typography: {
      size: { element2 },
      weight: { semibold },
    },
  }: Theme) => ({
    justifyContent: 'center',

    height: '34px',
    flexShrink: 0,
    color: bluegray40,
    fontSize: element2,
    fontWeight: semibold,
    lineHeight: '18px',
    letterSpacing: '-0.2px',
    padding: '0 12px',
    borderRadius: '6px',
    border: `1px solid ${gray_eaeaea}`,
  }),
];

export { wrap, headSection, title, ul, card_wrap, info_wrap, times, lesson_name, package_info, btn };
