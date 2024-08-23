import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const sectionWrap = [
  f.sideGutter,
  f.fullWidth,
  f.flexColumn,
  ({ color: { background } }: Theme) => ({
    backgroundColor: background[50],
  }),
];

const title = ({ color: { text }, typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  color: text[50],
  fontSize: fontSize[18],
  fontWeight: fontWeight[500],
  lineHeight: '32px',
  letterSpacing: '-0.4px',
  marginBottom: '40px',

  b: {
    fontWeight: fontWeight[700],
  },

  'b:first-of-type': {
    display: 'block',
  },
});

const filterWrap = [
  f.fullWidth,
  ({
    color: { background, text },
    typography: { fontSize, fontWeight },
    layout: {
      radii: { full },
    },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: background[50],
    marginBottom: '28px',

    '& > ul ': {
      display: 'flex',
      alignItems: 'center',
    },

    '& > ul > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: full,
      marginRight: '12px',

      '& > button': {
        color: text[50],
        fontSize: fontSize[16],
        fontWeight: fontWeight[600],
        letterSpacing: '-0.2px',
      },

      '&:first-of-type': {
        background: 'linear-gradient(263deg, #2EE477 0%, #50BEFD 100%)',
      },
    },

    '& > button': {
      display: 'flex',
      alignItems: 'center',
      color: '#E6E6E6',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
    },
  }),
];

const wrap = [
  f.fullWidth,
  f.flexColumn,
  ({ color: { background } }: Theme) => ({
    paddingBottom: '24px',
    backgroundColor: background[50],
  }),
];

const loading: CSSObject = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  paddingTop: '36px',
  opacity: 0.07,
};

export { sectionWrap, title, filterWrap, wrap, loading };
