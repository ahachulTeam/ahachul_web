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

export const indicator = [
  cssUtils.flexColumn,
  ({ color: { text }, typography: { fontSize } }: Theme) => ({
    gap: '4px',
    alignItems: 'center',
    marginTop: '10px',
    color: text[50],
    fontSize: fontSize[12],
    letterSpacing: '-0.2px',
  }),
] as Interpolation<Theme>;

export const skeleton = {
  marginTop: '5px',
} as Interpolation<Theme>;
