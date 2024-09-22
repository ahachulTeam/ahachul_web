import { fadeIn } from 'shared/lib/config/animation/keyframes';
import cssUtils from 'shared/utils.css';

export const layout = [
  cssUtils.sideGutter,
  cssUtils.pagePaddingTop,
  {
    animation: `0.3s forwards ${fadeIn}`,
  },
];
