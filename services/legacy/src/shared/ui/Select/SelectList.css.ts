import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.flexAlignCenter,
  cssUtils.overflowScroll,
  {
    paddingLeft: '20px',
    paddingRight: '20px',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
] as Interpolation<Theme>;

export const select =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) =>
    ({
      flexShrink: 0,
      border: '1px solid rgb(196, 212, 252, 0.37)',
      height: '32px',
      borderRadius: '124px',
      padding: '0 14px',
      fontSize: fontSize[14],
      width: 'max-content',
      marginRight: '8px',
      background: isActive ? 'rgb(196, 212, 252)' : 'inherit',
      color: isActive ? '#141517' : '#9da5b6',
      fontWeight: isActive ? fontWeight[600] : fontWeight[400],
    }) as Interpolation<Theme>;
