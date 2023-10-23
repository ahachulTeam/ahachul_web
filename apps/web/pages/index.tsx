import { handleSessionStorage, useDisclosure } from '@ahhachul/lib'
import { useEffect, type ReactElement, useState } from 'react'

import { HomeHeader } from '@/components/domain/home/header'
import BottomSheetForLogin from '@/components/public/cta/forLogin/ForLogin'
import { Layout } from '@/components/public/layout'
import HomeMainScreen from '@/components/screens/MainHome'
import { APP_CONVERSION_CTA_STORAGE_KEY } from '@/constants'

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const storage = typeof window !== 'undefined' ? handleSessionStorage(APP_CONVERSION_CTA_STORAGE_KEY) : undefined

    if (!storage) {
      return
    }

    const appConversionToken = storage.get()
    const isAlreadyInitialized = () => Boolean(appConversionToken)

    if (!isAlreadyInitialized()) {
      storage.set(APP_CONVERSION_CTA_STORAGE_KEY)
      setTimeout(() => {
        setIsMounted(true)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) {
      return
    }
    onOpen()
  }, [isMounted, onOpen])

  return (
    <>
      <HomeMainScreen />
      <BottomSheetForLogin ref={dialogRef} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}
