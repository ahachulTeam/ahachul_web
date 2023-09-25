import type { AppLayoutProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'
import AppInner from '@/components/public/AppInner'
import { AppProvider } from '@/libs'

import '@/styles/fonts.css'
import '@/styles/nprogress.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
          key="viewport"
        />
        <meta name="description" content="" />
        <meta property="og:title" content="피둥피둥" />
        <meta property="og:description" content="" />
        <meta property="og:image" content={'/og_image.png'} />
        <link rel="shortcut icon" href="/logo-desktop.svg" />
      </Head>
      <AppProvider dehydrateState={pageProps.dehydrateState}>
        <AppInner>{getLayout(<Component {...pageProps} />)}</AppInner>
      </AppProvider>
    </>
  )
}

export default MyApp
