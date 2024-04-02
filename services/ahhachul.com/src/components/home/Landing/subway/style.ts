import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const sectionWrap = [
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
    paddingTop: '24px',
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
    color: {
      static: {
        dark: { gray },
      },
    },
    typography: { fontSize, fontWeight },
    layout: {
      radii: { full },
    },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: gray[200],
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
        color: gray[1000],
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
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme) => ({
    paddingBottom: '24px',
    backgroundColor: gray[200],
  }),
];

const loading: CSSObject = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  paddingTop: '36px',
  opacity: 0.1,
};

export { sectionWrap, title, filterWrap, wrap, loading };
