import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const swipeContainer = [
  cssUtils.posRel,
  cssUtils.maxWidth,
  {
    width: '100vw',
    aspectRatio: '1 / 0.92',
  },
] as Interpolation<Theme>;

export const swipeImg = [
  cssUtils.posAbsFull,
  {
    objectFit: 'cover',
  },
] as Interpolation<Theme>;
