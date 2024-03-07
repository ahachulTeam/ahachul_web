import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      primary: { white },
    },
  }: Theme): CSSObject => ({
    paddingTop: '32px',
    paddingBottom: '24px',
    backgroundColor: white,
  }),
];

const head_section = [
  f.sideGutter,
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
  }: Theme) => ({
    justifyContent: 'space-between',
    marginBottom: '16px',
    gap: '12px',

    '& button': {
      height: '28px',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justfyContent: 'center',
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
      primary: { purple },
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
        color: purple,
        marginLeft: '4px',
      },
    },
  }),
];

const tickets_wrap = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      primary: { blue },
    },
  }: Theme): CSSObject => ({
    padding: '24px',
    backgroundColor: blue,
  }),
];

const info_wrap = [
  f.flexAlignCenter,
  ({
    color: {
      primary: { white },
      sub: { green_63ffab },
    },
    typography: {
      size: { paragraph1, element3 },
      weight: { semibold },
    },
  }: Theme): CSSObject => ({
    marginBottom: '20px',

    '& div': {
      marginRight: '8px',
    },

    '& span': {
      color: white,
      fontSize: paragraph1,
      fontWeight: semibold,
      lineHeight: '24px',
      letterSpacing: '-0.4px',
      marginRight: '8px',
    },

    '& p': {
      color: green_63ffab,
      fontSize: element3,
      fontWeight: semibold,
      height: '24px',
      padding: '0 10px',
      border: '1px solid rgba(255, 255, 255, 0.30)',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '14px',
      letterSpacing: '-0.2px',
    },
  }),
];

const card_wrap = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      primary: { white },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    backgroundColor: white,
    borderRadius: '8px',
    overflow: 'hidden',
  }),
];

const card_top = [
  f.fullWidth,
  f.flexColumn,
  {
    padding: '20px',
  },
];

const package_info = [
  f.flexAlignCenter,
  ({
    color: {
      bluegray: { bluegray50 },
    },
    typography: {
      size: { paragraph2 },
      weight: { medium },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    marginBottom: '9.5px',

    '& > div > span': {
      color: bluegray50,
      fontSize: paragraph2,
      fontWeight: medium,
      lineHeight: '18px',
      letterSpacing: '-0.2px',
      marginRight: '2px',
    },
  }),
];

const lesson_name = [
  f.flexColumn,
  ({
    color: {
      primary: { black },
    },
    typography: {
      size: { heading5 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    paddingRight: '50px',
    marginBottom: '8px',

    color: black,
    fontSize: heading5,
    fontWeight: bold,
    lineHeight: '24px',
    letterSpacing: '-0.4px',
  }),
];

const times = [
  f.flexAlignCenter,
  ({
    color: {
      primary: { blue },
    },
    typography: {
      size: { paragraph2 },
      weight: { bold },
    },
  }: Theme): CSSObject => ({
    marginBottom: '8px',

    '& span': {
      color: blue,
      fontSize: paragraph2,
      fontWeight: bold,
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '6px',
    },
  }),
];

const ticket_name = [
  f.flexAlignCenter,
  ({
    color: {
      sub: { gray_b0b0b0 },
    },
    typography: {
      size: { element4 },
      weight: { semibold },
    },
  }: Theme) => ({
    marginRight: '50px',
    height: '26px',
    width: 'max-content',
    color: gray_b0b0b0,
    fontSize: element4,
    fontWeight: semibold,
    lineHeight: '14px',
    letterSpacing: '-0.2px',
    padding: '0 9px',
    borderRadius: '3px',
    border: '1px solid rgba(176, 176, 176, 0.40)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
];

const card_bottom = [
  f.flexAlignCenter,
  ({
    color: {
      sub: { gray_f5f8fd },
    },
  }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    height: '54px',
    padding: '0 20px',
    backgroundColor: gray_f5f8fd,
  }),
];

const labels = [
  f.flexAlignCenter,
  ({
    color: {
      primary: { blue, white },
      sub: { gray_e1e9f5 },
    },
    typography: {
      size: { element3 },
      weight: { semibold },
    },
  }: Theme): CSSObject => ({
    gap: '8px',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50px',
      border: `1px solid ${gray_e1e9f5}`,
      height: '30px',
      padding: '0 10px',
      backgroundColor: white,
      color: blue,
      fontSize: element3,
      fontWeight: semibold,
      lineHeight: '14px',
      letterSpacing: '-0.2px',
    },
  }),
];

const bannerIcon = ({
  color: {
    sub: { blue_83a7e1 },
  },
}: Theme): CSSObject => ({
  '& svg': { width: '20px', height: '20px', transform: 'rotate(180deg)', '& path': { stroke: blue_83a7e1 } },
});

export {
  wrap,
  head_section,
  title,
  tickets_wrap,
  info_wrap,
  card_wrap,
  card_top,
  times,
  lesson_name,
  package_info,
  ticket_name,
  card_bottom,
  labels,
  bannerIcon,
};
