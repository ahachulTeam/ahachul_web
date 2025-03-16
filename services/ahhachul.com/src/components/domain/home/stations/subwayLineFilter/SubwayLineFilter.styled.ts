import { Interpolation, Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants/subway';
import { mixins } from '@/styles';

export const filters = [
  mixins.fullWidth,
  mixins.flexAlignCenter,
  ({ colors: { gray } }: Theme) => ({
    backgroundColor: gray[100],
    marginBottom: '32px',
  }),
] as Interpolation<Theme>;

export const inherit = (line: number) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: line < 10 ? '28px' : 'max-content',
  height: '28px',
  borderRadius: 999999,
  padding: '0 8px',
  marginRight: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.4s ease-in-out',
  backgroundColor: subwayLineHexColors(line),
});

export const filterBtn = (length: number) => ({
  color: 'white',
  fontSize: length >= 4 ? '12px' : '14px',
  fontWeight: 600,
  letterSpacing: '-0.2px',
});
