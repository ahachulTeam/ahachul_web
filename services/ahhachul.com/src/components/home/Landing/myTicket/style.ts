import { CSSObject, Theme } from '@emotion/react';
import { f } from 'shared/style';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { gray } }: Theme): CSSObject => ({
    paddingTop: '32px',
    paddingBottom: '24px',
    backgroundColor: gray[200],
  }),
];

const head_section = [
  f.sideGutter,
  f.flex1,
  f.fullWidth,
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    justifyContent: 'space-between',
    marginBottom: '16px',
    gap: '12px',

    '& button': {
      height: '28px',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',
      justfyContent: 'center',
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
  ({ color: { gray, purple }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    span: {
      color: gray[200],
      fontSize: fontSize[18],
      fontWeight: fontWeight[700],
      lineHeight: '28px',
      letterSpacing: '-0.4px',
      marginLeft: '6px',

      b: {
        color: purple[900],
        marginLeft: '4px',
      },
    },
  }),
];

const tickets_wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { gray } }: Theme): CSSObject => ({
    padding: '24px',
    backgroundColor: gray[200],
  }),
];

const info_wrap = [
  f.flexAlignCenter,
  ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    marginBottom: '20px',

    '& div': {
      marginRight: '8px',
    },

    '& span': {
      color: gray[1000],
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      lineHeight: '24px',
      letterSpacing: '-0.4px',
      marginRight: '8px',
    },

    '& p': {
      color: '#63ffab ',
      fontSize: fontSize[12],
      fontWeight: fontWeight[600],
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
  ({ color: { gray } }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    backgroundColor: gray[1000],
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
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    marginBottom: '9.5px',

    '& > div > span': {
      color: '#727B8E',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
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
      scale: { gray },
    },
    typography: { fontSize, fontWeight },
  }) => ({
    marginBottom: '8px',

    color: gray[0],
    fontSize: fontSize[18],
    fontWeight: fontWeight[700],
    lineHeight: '24px',
    letterSpacing: '-0.4px',
  }),
];

const times = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    marginBottom: '8px',

    '& span': {
      color: '#004FEC',
      fontSize: fontSize[14],
      fontWeight: fontWeight[700],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
      marginRight: '6px',
    },
  }),
];

const ticket_name = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    marginRight: '50px',
    height: '26px',
    width: 'max-content',
    color: '#b0b0b0',
    fontSize: fontSize[11],
    fontWeight: fontWeight[600],
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
  {
    justifyContent: 'space-between',
    height: '54px',
    padding: '0 20px',
    backgroundColor: '#f5f8fd',
  },
];

const labels = [
  f.flexAlignCenter,
  ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    gap: '8px',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50px',
      border: `1px solid #e1e9f5`,
      height: '30px',
      padding: '0 10px',
      backgroundColor: gray[1000],
      color: '#004FEC',
      fontSize: fontSize[12],
      fontWeight: fontWeight[600],
      lineHeight: '14px',
      letterSpacing: '-0.2px',
    },
  }),
];

const bannerIcon = {
  '& svg': { width: '20px', height: '20px', transform: 'rotate(180deg)', '& path': { stroke: '#83a7e1' } },
};

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
