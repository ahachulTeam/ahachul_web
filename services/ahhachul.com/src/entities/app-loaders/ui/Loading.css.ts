import type { Interpolation, Theme } from '@emotion/react';

export const loader = ({
  dimensions: {
    size: {
      height: { header },
    },
  },
}: Theme) =>
  ({
    width: '130px',
    position: 'relative',
    top: `-${header}`,
  }) as Interpolation<Theme>;
