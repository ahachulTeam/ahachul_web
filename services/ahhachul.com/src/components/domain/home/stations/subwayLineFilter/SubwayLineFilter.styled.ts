import { Interpolation, Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants/subway';
import { mixins } from '@/styles';
import { SubwayLineType } from '@/types';

export const container = [
  mixins.fullWidth,
  mixins.flexJustifySpaceBetween,
  ({ colors: { gray } }: Theme) => ({
    backgroundColor: gray[100],
    marginBottom: '32px',
  }),
];

export const filters = [mixins.flexAlignCenter, { flex: 1 }] as Interpolation<Theme>;

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
  },
];
