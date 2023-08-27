import { Theme, css } from '@emotion/react'

export const floatCss = (theme: Theme) => css`
  position: fixed;
  bottom: calc(${theme.size.bottomNavbar.height} + 16px);
  max-width: 132px;
  right: 20px;
  padding: 0 24px;
  z-index: ${theme.zIndex.sticky};
  filter: drop-shadow(0px 6px 16px rgba(91, 91, 91, 0.25));
`
