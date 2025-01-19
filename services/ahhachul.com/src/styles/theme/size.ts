import { css } from '@emotion/react';

import { breakPoint } from '@/styles/theme/breakPoint';

export const size = {
  header: {
    height_d: '72px',
    height_m: '58px',
  },
  navbar: {
    height_d: '92px',
    height_m: '60px',
  },
  footer: {
    height_d: '322px',
    height_t: '348px',
    height_m: '412px',
  },
  container: css`
    max-width: 100%;
    width: 100vw;
    padding: 0 20px;

    @media ${breakPoint.device.tablet} {
      max-width: 520px;
      margin: 0 auto;
    }
  `,
} as const;

export type SizeTheme = typeof size;
