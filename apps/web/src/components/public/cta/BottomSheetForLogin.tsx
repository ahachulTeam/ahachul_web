import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import LogoImg from 'public/illust/img/img_favicon.png'
import { forwardRef } from 'react'

import { BottomSheet } from '@/components/common'
import { PATH } from '@/constants'

interface BottomSheetForLoginProps {
  isOpen: boolean
  onClose: () => void
}

const BottomSheetForLogin = forwardRef<HTMLDialogElement, BottomSheetForLoginProps>(({ isOpen, onClose }, ref) => {
  return (
    <CTABottomSheet ref={ref} isHeaderHidden title="앱 다운로드 팝업" isOpen={isOpen} onClose={onClose}>
      <ContentBox>
        <Image src={LogoImg} alt="" width={94} height={94} />
        <Strong>
          아하철에서 제공되는 혜택을
          <br />
          놓치고 계신 건 아닌가요?
        </Strong>
        <P>아하철 로그인시 다양한 혜택 및 팁을 제공 중!</P>
        <Link href={PATH.LOGIN}>로그인하기</Link>
        <CloseBtn type="button" onClick={onClose}>
          괜찮아요, 다음에 로그인 할게요.
        </CloseBtn>
      </ContentBox>
    </CTABottomSheet>
  )
})

const CTABottomSheet = styled(BottomSheet)`
  padding: 70px 20px 46px;
`

const ContentBox = styled.div`
  width: 100%;
  text-align: center;
  & > img {
    border-radius: 20px;
  }
`

const Strong = styled.strong`
  ${({ theme }) => css`
    ${theme.fonts.bold20};
    display: block;
    width: 100%;
    margin-top: 24px;
    color: ${theme.colors.black};
  `}
`

const P = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    padding: 8px 0 24px;
    color: ${theme.colors.gray_80};
  `}
`

const Link = styled.a`
  ${({ theme }) => css`
    ${theme.fonts.semibold14};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    max-width: 335px;
    margin: 0 auto;
    border-radius: 25px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
    transition: all 0.3s ease-in-out;

    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${theme.colors.primary_hover};
      }
    }

    &:active {
      background-color: ${theme.colors.primary_active};
    }

    &:disabled {
      color: ${theme.colors.gray_30};
      background-color: ${theme.colors.gray_20};
    }
  `}
`

const CloseBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.medium14};
    width: 100%;
    height: 50px;
    max-width: 335px;
    margin: 0 auto;
    color: ${theme.colors.gray_40};
    background-color: ${theme.colors.white};
  `}
`

export default BottomSheetForLogin
