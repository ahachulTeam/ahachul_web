import { CSSObject, Theme } from '@emotion/react';
import { f } from '@/src/styles';

const wrap: [CSSObject[], CSSObject, CSSObject, ({ color }: Theme) => CSSObject] = [
  f.flexColumn,
  f.fullWidth,
  f.fullHeight,
  ({
    color: {
      scale: { gray },
    },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    position: 'relative',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#1F1F1F',

    '& > span': {
      color: gray[1000],
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      marginBottom: '8px',
    },

    '& > p': {
      color: '#BEC1CB',
      fontSize: fontSize[12],
    },

    '& > div': {
      position: 'absolute',
      right: '16px',
      bottom: '10px',
    },

    '& > article': {
      position: 'absolute',
      right: '16px',
      bottom: '10px',
      textAlign: 'right',

      '& > span': {
        color: '#BEC1CB',
        fontSize: fontSize[12],
      },

      '& > p': {
        color: '#F5F7FF',
        fontSize: fontSize[12],
        marginTop: '4px',
        marginBottom: '6px',
      },

      '& > div': {
        color: '#28B2FF',
        fontSize: fontSize[48],
        fontWeight: fontWeight[600],
      },
    },
  }),
];

const grid = {
  gap: '8px',
};

export { wrap, grid };
