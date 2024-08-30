import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = (asChild: boolean) => ({
  padding: '12px 20px',

  '& > article': {
    paddingLeft: asChild ? '16px' : '0',
  },
});

export const name = ({
  color: { blueDarkGray },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    fontSize: fontSize[12],
    fontWeight: fontWeight[700],
    color: blueDarkGray[600],
  }) as Interpolation<Theme>;

export const body = ({
  color: { blueDarkGray },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    color: blueDarkGray[600],
    fontSize: fontSize[14],
    fontWeight: fontWeight[400],
    paddingRight: '42px',
    margin: '6px 0 12px',
  }) as Interpolation<Theme>;

export const 답글달기 = ({
  color: { blueDarkGray },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    fontSize: fontSize[12],
    fontWeight: fontWeight[600],
    color: blueDarkGray[50],
  }) as Interpolation<Theme>;

export const like = [
  cssUtils.flexAlignCenter,
  ({
    color: { blueDarkGray },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    '& > div': {
      '& > svg > path': {
        fill: blueDarkGray[600],
      },
    },

    '& > span': {
      marginLeft: '4px',
      fontSize: fontSize[12],
      fontWeight: fontWeight[400],
      color: blueDarkGray[50],
    },
  }),
] as Interpolation<Theme>;
