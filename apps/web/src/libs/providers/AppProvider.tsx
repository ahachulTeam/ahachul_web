import { theme } from '@ahhachul/design-system'
import { GlobalStyles } from '@ahhachul/ui'

import { ThemeProvider } from '@emotion/react'
import type { DehydratedState } from '@tanstack/react-query'
import { domMax, LazyMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { type PropsWithChildren } from 'react'

import Progress from './NProgress'
import ReactQuery from './ReactQuery'
import Recoil from './Recoil'
import { MonitoringInitializer } from '@/components/public/monitoring'
import { AuthProvider } from '@/context'

const Toast = dynamic<{}>(() => import('@/components').then(module => module.Toast))

interface AppProviderProps extends PropsWithChildren {
  dehydrateState: DehydratedState
}

export default function AppProvider({ children, dehydrateState }: AppProviderProps) {
  return (
    <Recoil>
      <ReactQuery state={dehydrateState}>
        <LazyMotion features={domMax}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AuthProvider>
              <Progress>{children}</Progress>
              <Toast />
            </AuthProvider>
            <MonitoringInitializer />
          </ThemeProvider>
        </LazyMotion>
      </ReactQuery>
    </Recoil>
  )
}
