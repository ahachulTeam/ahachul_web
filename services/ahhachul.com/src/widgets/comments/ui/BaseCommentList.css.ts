import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const comments = [
  cssUtils.flexColumn,
  {
    '& > li:not(:last-of-type)': {
      borderBottom: '1px solid hsla(0, 0%, 100%, .06)',
    },
  },
] as Interpolation<Theme>;

export const count = ({
  color: { blueDarkGray },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    fontSize: fontSize[14],
    fontWeight: fontWeight[700],
    color: blueDarkGray[600],
  }) as Interpolation<Theme>;

export const filter =
  (isActive: boolean) =>
  ({ color: { blueDarkGray }, typography: { fontSize, fontWeight } }: Theme) =>
    ({
      color: blueDarkGray[300],
      fontSize: fontSize[12],
      fontWeight: isActive ? fontWeight[700] : fontWeight[500],
    }) as Interpolation<Theme>;
