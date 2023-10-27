import { handleSessionStorage, useDisclosure } from '@ahhachul/lib'
import React, { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

import BottomSheetForLogin from '@/components/public/cta/forLogin/ForLogin'
import { APP_CONVERSION_CTA_STORAGE_KEY } from '@/constants'
import { useAuth } from '@/context'
import { useGetHottestHashtagsQuery, useMyProfileQuery } from '@/services'

function AppInner({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth()
  useMyProfileQuery({ enabled: isLoggedIn() })
  useGetHottestHashtagsQuery()

  // TODO: 밑에 로직들 따로 빼고 리팩토링하기
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
  // 추후 fcm 연동하기
  return (
    <React.Fragment>
      {children}
      <BottomSheetForLogin ref={dialogRef} isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  )
}

export default AppInner
