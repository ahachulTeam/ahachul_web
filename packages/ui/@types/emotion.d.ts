import '@emotion/react'

import { theme } from '@ahhachul/design-system'

type CustomTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
