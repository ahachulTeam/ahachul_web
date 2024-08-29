import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const trainCongestions = [
  cssUtils.posRel,
  cssUtils.fullWidth,
  cssUtils.flexCenterCenter,
  {
    '& > ul': {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      columnGap: '4px',
      width: 'calc(100% - 32px)',
      position: 'absolute',
      top: '4px',

      '& > li': {
        width: '100%',
        height: '26px',
        position: 'relative',
        left: '8px',
      },
    },
  },
] as Interpolation<Theme>;
