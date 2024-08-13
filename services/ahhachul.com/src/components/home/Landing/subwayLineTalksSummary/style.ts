import { CSSObject, Theme } from '@emotion/react';

import { f } from 'styles';

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { gray } }: Theme) => ({
    paddingTop: '32px',
    paddingBottom: '32px',
    backgroundColor: gray[200],
  }),
];

const headSection = [
  f.sideGutter,
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
      fontSize: fontSize[12],
      fontWeight: fontWeight[500],
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
  }),
];

const title = [
  f.flexAlignCenter,
  ({ color: { gray }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    span: {
      color: gray[1000],
      fontSize: fontSize[16],
      fontWeight: fontWeight[700],
      lineHeight: '28px',
      letterSpacing: '-0.4px',
      marginLeft: '6px',
    },
  }),
];

const ul = [
  f.fullWidth,
  f.flexAlignCenter,
  {
    padding: '32px 20px',
    backgroundColor: '#1A191A',
  },
];

const card_wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { gray } }: Theme): CSSObject => ({
    justifyContent: 'space-between',
    padding: '20px 16px',
    backgroundColor: gray[0],
    borderRadius: '12px',
    border: '1px solid #242524',
  }),
];

const nickname = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  fontSize: fontSize[14],
  fontWeight: fontWeight[600],
  color: '#c9cedc',
});

const time = ({ typography: { fontSize } }: Theme): CSSObject => ({
  fontSize: fontSize[12],
  color: '#9da5b6',
  marginLeft: '6px',
});

const content = [
  f.truncate2,
  ({ typography: { fontSize } }: Theme) => ({
    fontSize: fontSize[14],
    color: '#c9cedc',
    letterSpacing: '-0.3px',
    lineHeight: '19px',
  }),
];

const img: CSSObject = {
  width: '80px',
  minWidth: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginLeft: '16px',

  '& > img': {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '6px',
  },
};

const label = ({ typography: { fontSize } }: Theme): CSSObject => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px',

  '& > span': {
    fontSize: fontSize[12],
    color: '#c9cedc',
    letterSpacing: '-0.3px',
    lineHeight: '19px',
    marginLeft: '4px',
  },
});

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

export { wrap, headSection, title, ul, card_wrap, nickname, time, content, img, label, btn };
