import { Interpolation, Theme } from '@emotion/react';

import { subwayLineHexColors } from '@/constants/subway';
import { mixins } from '@/styles';

export const filters = [
  mixins.fullWidth,
  mixins.flexAlignCenter,
  ({ colors: { white } }: Theme) => ({
    backgroundColor: white,
    marginBottom: '28px',

    '& > li': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      padding: '0 12px',
      marginRight: '12px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      '& > button': {
        color: white,
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '-0.2px',
      },
    },
  }),
] as Interpolation<Theme>;

export const inherit = (line: number) => ({
  transition: 'background-color 0.4s ease-in-out',
  background: subwayLineHexColors(line),
});
