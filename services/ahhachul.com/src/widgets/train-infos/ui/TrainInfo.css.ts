import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const section = [
  cssUtils.sideGutter,
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  ({ color: { background } }: Theme) => ({
    backgroundColor: background[50],
  }),
] as Interpolation<Theme>;
