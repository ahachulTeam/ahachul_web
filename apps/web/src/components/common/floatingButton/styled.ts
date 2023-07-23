import { Theme, css } from '@emotion/react'

export const floatCss = (theme: Theme) => css`
  position: sticky;
  position: -webkit-sticky;
  bottom: calc(${theme.size.bottomNavbar.height} + 37px);
  max-width: 132px;
  left: calc(100% - 16px - 132px); // fixme
  padding: 0 30px;
  filter: drop-shadow(0px 6px 16px rgba(91, 91, 91, 0.25));
  z-index: ${theme.zIndex.sticky};
`
