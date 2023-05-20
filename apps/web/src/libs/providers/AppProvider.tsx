import { Global, ThemeProvider } from '@emotion/react'
import { domMax, LazyMotion } from 'framer-motion'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'

import ReactQuery from './ReactQuery'
import Recoil from './Recoil'
import { MonitoringInitializer } from '@/components/monitoring'
import { AuthProvider } from '@/context'
import { theme, globalStyles } from '@/styles'

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
            <Global styles={globalStyles} />
            <ThemeProvider theme={theme}>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </LazyMotion>
        </ReactQuery>
      </Recoil>
    </>
  )
}
