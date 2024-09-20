import { Interpolation, Theme } from '@emotion/react';
import { fadeIn } from 'shared/lib/config/animation/keyframes';
import cssUtils from 'shared/utils.css';

export const layout = [
  cssUtils.sideGutter,
  {
    animation: `0.3s forwards ${fadeIn}`,
    paddingTop: '91px',
  },
] as Interpolation<Theme>;
