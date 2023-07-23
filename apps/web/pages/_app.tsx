/* eslint-disable @typescript-eslint/ban-types */
import type { AppLayoutProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, useEffect } from 'react'

import { DEFAULT_SEO_CONFIG, PATH_STORAGE_KEYS } from '@/constants'
import { AppProvider, SEO } from '@/libs'
import '@/styles/nprogress.css'
import '@/styles/fonts.css'

const Toast = dynamic<{}>(() => import('@/components').then(module => module.Toast))

NProgress.configure({ minimum: 0.1, showSpinner: false, easing: 'linear' })

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const router = useRouter()

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  useEffect(() => storePathValues, [router.asPath])

  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) {
      return
    }
    const prevPath = storage.getItem(PATH_STORAGE_KEYS.CURRENT_PATH) || ''
    storage.setItem(PATH_STORAGE_KEYS.PREV_PATH, prevPath)
    storage.setItem(PATH_STORAGE_KEYS.CURRENT_PATH, globalThis.location.pathname)
  }

  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()
    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteDone)
    router.events.on('routeChangeError', handleRouteDone)

    return () => {
      router.events.off('routeChangeStart', handleRouteStart)
      router.events.off('routeChangeComplete', handleRouteDone)
      router.events.off('routeChangeError', handleRouteDone)
    }
  }, [router.events])

  return (
    <>
      <SEO {...DEFAULT_SEO_CONFIG} />
      <AppProvider dehydrateState={pageProps.dehydrateState}>
        <Toast />
        {getLayout(<Component {...pageProps} />)}
      </AppProvider>
    </>
  )
}

export default MyApp
