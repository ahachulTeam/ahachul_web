import { useDisclosure } from '@ahhachul/lib'
import { useEffect } from 'react'
import BottomSheetForLogin from '../ForLogin'
import { useAuth } from '@/context'

export const useWithLoginButton = (actionFn: any) => {
  const { auth } = useAuth()
  const { isAuth } = auth

  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    isAuth ? typeof actionFn === 'function' && actionFn() : onOpen()
  }, [actionFn, isAuth, onOpen])

  return <BottomSheetForLogin ref={dialogRef} isOpen={isOpen} onClose={onClose} />
}
