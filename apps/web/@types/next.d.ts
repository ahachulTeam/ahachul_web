/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
    useLayout?: (page: ReactNode) => ReactNode
  }

  type NextLayoutPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    useLayout: (page: ReactNode) => ReactNode
  }
}

declare module 'next/app' {
  type AppLayoutProps = AppProps<any> & {
    Component: NextLayoutComponentType
  }
}
