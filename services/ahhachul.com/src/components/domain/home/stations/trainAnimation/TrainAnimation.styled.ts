import { Interpolation, Theme } from '@emotion/react';

import { mixins } from '@/styles';

export const trainCongestions = [
  mixins.posRel,
  mixins.fullWidth,
  mixins.flexCenterCenter,
  {
    '& > ul': {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      columnGap: '4px',
      width: 'calc(100% - 32px)',
      position: 'absolute',
      top: '4px',
      left: '50%',
      transform: 'translateX(-50%)',

      '& > li': {
        width: '100%',
        height: '26px',
        position: 'relative',
        left: '8px',
      },
    },
  },
] as Interpolation<Theme>;
