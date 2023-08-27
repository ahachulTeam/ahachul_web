import { handleSessionStorage, useDisclosure } from '@ahhachul/lib'
import { useEffect, type ReactElement, useState } from 'react'

import { MainPageContainer } from '@/components'
import BottomSheetForLogin from '@/components/cta/forLogin/ForLogin'
import { HomeHeader } from '@/components/domain/home'
import { Layout } from '@/components/layout'
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
      <MainPageContainer />
      <BottomSheetForLogin ref={dialogRef} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout Header={<HomeHeader />}>{page}</Layout>
}
