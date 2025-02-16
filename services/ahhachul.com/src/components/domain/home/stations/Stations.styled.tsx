import { Interpolation, Theme } from '@emotion/react';

import { mixins } from '@/styles';

export const section = [
  mixins.sideGutter,
  mixins.fullWidth,
  mixins.flexColumn,
  {
    marginTop: '24px',
  },
] as Interpolation<Theme>;
