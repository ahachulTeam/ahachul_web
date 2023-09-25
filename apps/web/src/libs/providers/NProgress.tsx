import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect, type PropsWithChildren } from 'react'
import { CurrentPath, PrevPath } from '@/constants/pathValues'
import { setCurrentPathValueToCookie, setPrevPathValueToCookie } from '@/utils/pathValues'

NProgress.configure({ minimum: 0.1, showSpinner: false, easing: 'linear' })

function Progress({ children }: PropsWithChildren) {
  const router = useRouter()

  useEffect(() => storePathValues, [router.asPath])

  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) {
      return
    }

    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath') || 'null'
    storage.setItem(PrevPath, prevPath)
    setPrevPathValueToCookie(prevPath)
    // Set the current path value by looking at the browser's location object.
    storage.setItem(CurrentPath, globalThis.location.pathname)
    setCurrentPathValueToCookie(globalThis.location.pathname)
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

  return <>{children}</>
}

export default Progress
