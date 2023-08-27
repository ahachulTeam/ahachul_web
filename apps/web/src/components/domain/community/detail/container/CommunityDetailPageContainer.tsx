import { useDisclosure } from '@ahhachul/lib'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Suspense } from 'react'
import Comments from '../comments/Comments'
import Contents from '../contents/Contents'
import * as S from './styled'
import BottomSheetForLogin from '@/components/cta/forLogin/ForLogin'
import { useAuth } from '@/context'

export const CommunityDetailPageContainer = () => {
  const {
    user,
    auth: { isAuth },
  } = useAuth()

  // fixme : isLoginBottomSheetOpen, LoginBottomSheet Component 상태를 전역 atom으로 갖기
  const {
    dialogRef,
    isOpen: isLoginBottomSheetOpen,
    onOpen: onLoginBottomSheetOpen,
    onClose: onLoginBottomSheetsClose,
  } = useDisclosure()

  return (
    <>
      <S.Container>
        <Suspense fallback={<LoadingSpinner />}>
          <Contents isAuth={isAuth} onLoginBottomSheetOpen={onLoginBottomSheetOpen} />
        </Suspense>
        <S.Divider />
        <Suspense fallback={<div />}>
          <Comments user={user} isAuth={isAuth} onLoginBottomSheetOpen={onLoginBottomSheetOpen} />
        </Suspense>
      </S.Container>
      <BottomSheetForLogin ref={dialogRef} isOpen={isLoginBottomSheetOpen} onClose={onLoginBottomSheetsClose} />
    </>
  )
}

// 임시
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.5em;
  height: 1.5em;
  border: 3px solid #272727;
  border-top: 3px solid #e1e1e1;
  border-radius: calc(3.5em / 2);
  animation: ${spin} 2s linear infinite;
`
