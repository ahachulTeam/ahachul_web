import type { Interpolation, Theme } from '@emotion/react';

export const bottomDim = ({ dimensions: { zIndexes } }: Theme) =>
  ({
    width: '100vw',
    maxWidth: '520px',
    margin: '0 auto',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: zIndexes.nav - 1,
    pointerEvents: 'none',
    height: '200px',
    background:
      'linear-gradient(180deg, rgba(24, 24, 29, 0.00) 0%, rgba(24, 24, 29, 0.09) 7.58%, rgba(24, 24, 29, 0.59) 34.59%, rgba(24, 24, 29, 0.69) 41.18%, rgba(24, 24, 29, 0.83) 51.39%, #18181D 63.25%)',
  }) as Interpolation<Theme>;
