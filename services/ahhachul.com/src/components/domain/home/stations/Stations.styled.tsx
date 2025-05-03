import { Interpolation, Theme } from '@emotion/react';

import { mixins } from '@/styles';

export const section = [
  mixins.fullWidth,
  mixins.flexColumn,
  {
    marginTop: '32px',
    marginBottom: '30px',
  },
] as Interpolation<Theme>;
