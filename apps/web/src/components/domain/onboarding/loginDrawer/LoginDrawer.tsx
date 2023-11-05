import Image from 'next/image'
import { ForwardedRef, forwardRef } from 'react'

import * as S from './styled'
import { BottomSheet } from '@/components/common'

interface Props {
  isOpen: boolean
  oAuthUrls: {
    kakao: string
    google: string
  }
  onClose: () => void
}

function LoginDrawer({ isOpen, oAuthUrls, onClose }: Props, ref: ForwardedRef<HTMLDialogElement>) {
  return (
    <BottomSheet ref={ref} title="로그인" isOpen={isOpen} onClose={onClose}>
      <S.ContentBox>
        <S.Link href={oAuthUrls.kakao}>
          <S.KakaoBtn>
            <Image src="/images/kakao.svg" alt="카카오 로고" width={21} height={19} />
            카카오 로그인
          </S.KakaoBtn>
        </S.Link>
        <S.Link href={oAuthUrls.kakao}>
          <S.GoogleBtn>
            <Image src="/images/google.svg" alt="구글 로고" width={21} height={19} />
            구글 로그인
          </S.GoogleBtn>
        </S.Link>
      </S.ContentBox>
    </BottomSheet>
  )
}

export default forwardRef(LoginDrawer)
