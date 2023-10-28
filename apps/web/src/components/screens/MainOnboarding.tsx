import { useDisclosure } from '@ahhachul/lib'
import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { LoginDrawer } from '../domain'
import { OnboardingCarousel } from '../domain/onboarding/carousel'
import PageTemplate from '../public/PageTemplate'
import { StaticSEO } from '@/constants/seo'
import { useAuth } from '@/context'

function OnboardingMainScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()
  const handleRouteRootPage = () => router.push('/')

  return (
    <PageTemplate>
      <PageTemplate.ContentsSection>
        <Container>
          <h2 css={visuallyHidden}>{StaticSEO.onboarding.title}</h2>
          <OnboardingCarousel />
          <Box>
            {!user && (
              <LoginBtn type="button" onClick={onOpen}>
                로그인
              </LoginBtn>
            )}
            <LookAroundBtn type="button" onClick={handleRouteRootPage}>
              둘러보기
            </LookAroundBtn>
          </Box>
        </Container>
      </PageTemplate.ContentsSection>
      <PageTemplate.ModalOrFloatingContents>
        <LoginDrawer ref={dialogRef} isOpen={isOpen} onClose={onClose} />
      </PageTemplate.ModalOrFloatingContents>
    </PageTemplate>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  touch-action: none;
`

const Box = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100%;
  transform: translateX(-50%);
`

const LoginBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 9vh;
    max-height: 90px;
    color: ${theme.colors.primary};
  `}
`

const LookAroundBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 9vh;
    max-height: 90px;
    color: #c2c2c2;
    text-decoration: underline;
  `}
`

const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`

export default OnboardingMainScreen
