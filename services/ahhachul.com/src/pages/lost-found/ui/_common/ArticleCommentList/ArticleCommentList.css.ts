import type { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const commentSection = [cssUtils.fullWidth, cssUtils.flexColumn] as Interpolation<Theme>;

export const decs = [
  cssUtils.fullWidth,
  cssUtils.sideGutter,
  cssUtils.flexAlignCenter,
  ({ typography: { fontSize, fontWeight }, color: { text } }: Theme) => ({
    fontSize: fontSize[14],
    fontWeight: fontWeight[600],
    color: text[50],
    height: '40px',
    borderTop: '1px solid hsla(0, 0%, 100%, .29)',
    borderBottom: '1px solid hsla(0, 0%, 100%, .15)',
  }),
] as Interpolation<Theme>;
