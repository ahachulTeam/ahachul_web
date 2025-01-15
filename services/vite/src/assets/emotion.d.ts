import '@emotion/react'

import type { theme } from '@allwagelab/design'

type DefaultTheme = typeof theme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends DefaultTheme {}
}
