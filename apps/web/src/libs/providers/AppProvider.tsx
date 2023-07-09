import { theme } from '@ahhachul/design-system'
import { GlobalStyles } from '@ahhachul/ui'

import { ThemeProvider } from '@emotion/react'
import type { DehydratedState } from '@tanstack/react-query'
import { domMax, LazyMotion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, type PropsWithChildren } from 'react'

import ReactQuery from './ReactQuery'
import Recoil from './Recoil'
import { MonitoringInitializer } from '@/components/monitoring'
import { AuthProvider } from '@/context'

interface AppProviderProps extends PropsWithChildren {
  dehydrateState: DehydratedState
}

export default function AppProvider({ children, dehydrateState }: AppProviderProps) {
  const { pathname, query } = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, query])

  return (
    <>
      <MonitoringInitializer />
      <Recoil>
        <ReactQuery state={dehydrateState}>
          <LazyMotion features={domMax}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </LazyMotion>
        </ReactQuery>
      </Recoil>
    </>
  )
}
