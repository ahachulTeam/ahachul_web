import { Interpolation, Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants/subway';
import { mixins } from '@/styles';
import { SubwayLineType } from '@/types';

export const container = [
  mixins.fullWidth,
  mixins.flexJustifySpaceBetween,
  ({ colors: { gray } }: Theme) => ({
    backgroundColor: gray[100],
    marginBottom: '16px',
  }),
];

export const filters = [
  mixins.flexAlignCenter,
  { flex: 1, paddingLeft: '20px' },
] as Interpolation<Theme>;

export const inherit = (line: SubwayLineType) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: Number(line) < 10 ? '28px' : 'max-content',
  height: '28px',
  borderRadius: 999999,
  padding: '0 8px',
  marginRight: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.4s ease-in-out',
  backgroundColor: subwayLineHexColors(Number(line)),
});

export const filterBtn = (length: number) => ({
  color: 'white',
  fontSize: length >= 4 ? '12px' : '14px',
  fontWeight: 600,
  letterSpacing: '-0.2px',
});

export const link = [
  mixins.flexAlignCenter,
  mixins.flexJustifySpaceBetween,
  {
    fontSize: '14px',
    fontWeight: 500,
    color: '#e6e6e6',
    padding: '12px 20px',
    borderRadius: '8px',
    transition: 'all 100ms ease-out',
    minHeight: '44px',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.02)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },

    '&:active': {
      transform: 'scale(0.93)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },

    '& > svg': {
      width: '20px',
      height: '20px',
    },
  },
];
