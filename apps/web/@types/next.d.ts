import type { DehydratedState } from '@tanstack/react-query'
import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
    getLayout?: (page: ReactNode) => ReactNode
  }

  type NextLayoutPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    getLayout: (page: ReactNode) => ReactNode
  }
}

declare module 'next/app' {
  type AppLayoutProps = AppProps<{ dehydrateState: DehydratedState }> & {
    Component: NextLayoutComponentType
  }
}
