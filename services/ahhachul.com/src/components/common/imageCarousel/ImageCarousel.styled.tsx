import { css } from '@emotion/react';

export const swipeContainerCss = css`
  position: relative;
  max-width: 100%;
  width: 100vw;
  aspect-ratio: 1 / 0.92;
`;

export const swipeImageCss = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
