import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  cssUtils.flexCenterCenter,
  ({ color: { text }, typography: { fontSize } }: Theme) => ({
    color: text[50],
    fontSize: fontSize[14],
    minHeight: '240px',
    gap: '8px',
  }),
] as Interpolation<Theme>;
