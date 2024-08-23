import { Theme } from '@emotion/react';
import { f } from 'shared/style';

const wrap = [
  f.sideGutter,
  f.fullWidth,
  ({
    color: { black, gray },
    typography: { fontSize, fontWeight },
    layout: {
      radii: { full },
    },
  }: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: black[100],
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
      color: gray[1000],
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      letterSpacing: '-0.2px',

      '&:first-of-type': {
        background: 'linear-gradient(263deg, #2EE477 0%, #50BEFD 100%)',
      },

      '&:nth-of-type(2)': {
        backgroundColor: '#025FAC',
      },

      '&:last-of-type': {
        backgroundColor: '#B3A58A',
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

export { wrap };
