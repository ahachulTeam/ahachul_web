import type { Interpolation, Theme } from '@emotion/react';
import { fadeIn } from 'shared/lib/config/animation/keyframes';
import cssUtils from 'shared/utils.css';

export const wrap = {
  width: '100%',
  height: '100vh',
} as Interpolation<Theme>;

export const layout = (isScaled = false) =>
  [
    cssUtils.sideGutter,
    {
      animation: `0.3s forwards ${fadeIn}`,
      paddingTop: '100px',
      transform: isScaled ? 'translateY(-50px)' : 'translateY(0)',
      transition: 'transform 0.4s ease',
    },
  ] as Interpolation<Theme>;
