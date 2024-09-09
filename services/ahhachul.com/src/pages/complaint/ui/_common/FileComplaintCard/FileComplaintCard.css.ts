import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.flexColumn,
  cssUtils.fullWidth,
  cssUtils.fullHeight,
  ({
    color: { text, white, black, blueDarkGray, skyBlue },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    position: 'relative',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: black[500],

    '& > span': {
      color: text[50],
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      marginBottom: '8px',
    },

    '& > p': {
      color: blueDarkGray[500],
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
        color: blueDarkGray[500],
        fontSize: fontSize[12],
      },

      '& > p': {
        color: white[700],
        fontSize: fontSize[12],
        marginTop: '4px',
        marginBottom: '6px',
      },

      '& > div': {
        color: skyBlue[500],
        fontSize: fontSize[48],
        fontWeight: fontWeight[600],
      },
    },
  }),
] as Interpolation<Theme>;
