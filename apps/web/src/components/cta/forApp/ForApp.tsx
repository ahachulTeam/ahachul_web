import Image from 'next/image'
import LogoImg from 'public/illust/img/img_favicon.png'
import { useEffect, useState } from 'react'

import * as S from './styled'
import { APP_CONVERSION_CTA_STORAGE_KEY } from '@/constants'
import { useDisclosure } from '@/hooks'

import handleSessionStorage from '@/utils/storage'

function BottomSheetForApp() {
  const [isMounted, setIsMounted] = useState(false)
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  return (
    <S.CTABottomSheet ref={dialoglRef} isHeaderHidden title="앱 다운로드 팝업" isOpen={isOpen} onClose={onClose}>
      <S.ContentBox>
        <Image src={LogoImg} alt="아하철 로고" width={94} height={94} />
        <S.Strong>
          아하철 앱에서 제공되는 혜택을
          <br />
          놓치고 계신 건 아닌가요?
        </S.Strong>
        <S.P>아하철 앱은 다양한 혜택 및 팁을 제공 중!</S.P>
        <S.Link href="https://github.com/ahachulTeam" target="_blank" rel="noreferrer">
          앱 이용하기
        </S.Link>
        <S.CloseBtn type="button" onClick={onClose}>
          괜찮아요, 모바일웹으로 볼게요.
        </S.CloseBtn>
      </S.ContentBox>
    </S.CTABottomSheet>
  )
}

export default BottomSheetForApp
