import Image from 'next/image'
import LogoImg from 'public/illust/img/img_favicon.png'
import { forwardRef } from 'react'

import * as S from './styled'
import { PATH } from '@/constants'

interface BottomSheetForLoginProps {
  isOpen: boolean
  onClose: () => void
}

const BottomSheetForLogin = forwardRef<HTMLDialogElement, BottomSheetForLoginProps>(({ isOpen, onClose }, ref) => {
  return (
    <S.CTABottomSheet ref={ref} isHeaderHidden title="앱 다운로드 팝업" isOpen={isOpen} onClose={onClose}>
      <S.ContentBox>
        <Image src={LogoImg} alt="" width={94} height={94} />
        <S.Strong>
          아하철에서 제공되는 혜택을
          <br />
          놓치고 계신 건 아닌가요?
        </S.Strong>
        <S.P>아하철 로그인시 다양한 혜택 및 팁을 제공 중!</S.P>
        <S.Link href={PATH.LOGIN}>로그인하기</S.Link>
        <S.CloseBtn type="button" onClick={onClose}>
          괜찮아요, 다음에 로그인 할게요.
        </S.CloseBtn>
      </S.ContentBox>
    </S.CTABottomSheet>
  )
})

export default BottomSheetForLogin
