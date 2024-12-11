import { type Interpolation, type Theme } from '@emotion/react';

export const buttonFilter = () =>
  ({
    flexShrink: 0,
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
  }) as Interpolation<Theme>;
