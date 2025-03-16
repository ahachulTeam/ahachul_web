import { Interpolation, Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants/subway';
import { mixins } from '@/styles';

export const filters = [
  mixins.fullWidth,
  mixins.flexAlignCenter,
  ({ colors: { gray } }: Theme) => ({
    backgroundColor: gray[100],
    marginBottom: '32px',

    '& > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'max-content',
      height: '32px',
      borderRadius: 999999,
      padding: '0 8px',
      marginRight: '12px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }),
] as Interpolation<Theme>;

export const filterBtn = (length: number) => ({
  color: 'white',
  fontSize: length >= 4 ? '12px' : '14px',
  fontWeight: 600,
  letterSpacing: '-0.2px',
});

export const inherit = (line: number) => ({
  transition: 'background-color 0.4s ease-in-out',
  background: subwayLineHexColors(line),
});
