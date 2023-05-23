import { css } from '@emotion/react'

export const size = {
  layout: {
    width: '768px',
  },
  header: {
    height: '56px',
  },
  bottomNavbar: {
    height: '60px',
  },
  footer: {
    height_d: '322px',
    height_t: '348px',
    height_m: '412px',
  },
  container: css`
    max-width: 100%;
    width: 100vw;
    padding: 0 15px;
  `,
} as const

export type SizeTheme = typeof size
