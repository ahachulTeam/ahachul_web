import type { AppLayoutProps } from 'next/app'
import { ReactElement } from 'react'

import AppInner from '@/components/public/AppInner'
import { DEFAULT_SEO_CONFIG } from '@/constants'
import { AppProvider, SEO } from '@/libs'
import '@/styles/fonts.css'
import '@/styles/nprogress.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return (
    <>
      <SEO {...DEFAULT_SEO_CONFIG} />
      <AppProvider dehydrateState={pageProps.dehydrateState}>
        <AppInner>{getLayout(<Component {...pageProps} />)}</AppInner>
      </AppProvider>
    </>
  )
}

export default MyApp
