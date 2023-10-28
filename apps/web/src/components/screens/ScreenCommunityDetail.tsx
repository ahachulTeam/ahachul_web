import { useDisclosure } from '@ahhachul/lib'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import CommunityDetailComments from '../domain/community/detail/comments/CommunityDetailComments'
import CommunityDetailContents from '../domain/community/detail/contents/CommunityDetailContents'
import PageTemplate from '../public/PageTemplate'
import { useAuth } from '@/context'
import { SEOProps } from '@/libs/SEO'

const BottomSheetForLogin = dynamic(() => import('@/components/public/cta/BottomSheetForLogin'), { ssr: false })

interface CommunityDetailScreenProps {
  metaData?: Partial<SEOProps>
}

const CommunityDetailScreen = ({ metaData }: CommunityDetailScreenProps) => {
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
    <PageTemplate metaData={metaData}>
      <PageTemplate.ContentsSection>
        <Container>
          <Suspense fallback={<LoadingSpinner />}>
            <CommunityDetailContents isAuth={isAuth} onLoginBottomSheetOpen={onLoginBottomSheetOpen} />
          </Suspense>
          <Divider />
          <Suspense fallback={<div />}>
            <CommunityDetailComments user={user} isAuth={isAuth} onLoginBottomSheetOpen={onLoginBottomSheetOpen} />
          </Suspense>
        </Container>
      </PageTemplate.ContentsSection>

      <PageTemplate.ModalOrFloatingContents>
        <BottomSheetForLogin ref={dialogRef} isOpen={isLoginBottomSheetOpen} onClose={onLoginBottomSheetsClose} />
      </PageTemplate.ModalOrFloatingContents>
    </PageTemplate>
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
