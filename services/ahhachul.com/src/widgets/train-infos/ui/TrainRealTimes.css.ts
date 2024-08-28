import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const trainRealTimes = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  ({ color: { background } }: Theme) => ({
    paddingBottom: '24px',
    backgroundColor: background[50],
  }),
] as Interpolation<Theme>;

export const inner = {
  minHeight: '72px',
  position: 'relative',
  margin: '72px 0 0',
} as Interpolation<Theme>;
