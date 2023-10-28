import { useDisclosure } from '@ahhachul/lib'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Suspense } from 'react'
import CommunityDetailComments from '../domain/community/detail/comments/CommunityDetailComments'
import CommunityDetailContents from '../domain/community/detail/contents/CommunityDetailContents'
import BottomSheetForLogin from '@/components/public/cta/BottomSheetForLogin'
import { useAuth } from '@/context'

const CommunityDetailScreen = () => {
  const {
    user,
    auth: { isAuth },
  } = useAuth()

  // eslint-disable-next-line no-warning-comments
  // fixme : isLoginBottomSheetOpen, LoginBottomSheet Component 상태를 전역 atom으로 갖기
  const {
    dialogRef,
    isOpen: isLoginBottomSheetOpen,
    onOpen: onLoginBottomSheetOpen,
    onClose: onLoginBottomSheetsClose,
  } = useDisclosure()

  return (
    <>
      <Container>
        <Suspense fallback={<LoadingSpinner />}>
          <CommunityDetailContents isAuth={isAuth} onLoginBottomSheetOpen={onLoginBottomSheetOpen} />
        </Suspense>
        <Divider />
        <Suspense fallback={<div />}>
          <CommunityDetailComments user={user} isAuth={isAuth} onLoginBottomSheetOpen={onLoginBottomSheetOpen} />
        </Suspense>
      </Container>
      <BottomSheetForLogin ref={dialogRef} isOpen={isLoginBottomSheetOpen} onClose={onLoginBottomSheetsClose} />
    </>
  )
}

const Container = styled.article`
  width: 100%;
`

const Divider = styled.div`
  ${({ theme }) => css`
    min-width: 100%;
    height: 10px;
    background-color: ${theme.colors.gray_10};
  `}
`

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

export default CommunityDetailScreen
