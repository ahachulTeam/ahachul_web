import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  cssUtils.pagePaddingTop,
  { paddingBottom: '120px' },
] as Interpolation<Theme>;
