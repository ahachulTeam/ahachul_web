import { theme } from '@ahhachul/design-system'
import { GlobalStyles } from '@ahhachul/ui'
import { ThemeProvider } from '@emotion/react'
import { domMax, LazyMotion } from 'framer-motion'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'

import ReactQuery from './ReactQuery'
import Recoil from './Recoil'
import { MonitoringInitializer } from '@/components/monitoring'
import { AuthProvider } from '@/context'

export default function AppProvider({ children }: PropsWithChildren) {
  const { pathname, query } = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, query])

  return (
    <>
      <MonitoringInitializer />
      <Recoil>
        <ReactQuery>
          <LazyMotion features={domMax}>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </LazyMotion>
        </ReactQuery>
      </Recoil>
    </>
  )
}
