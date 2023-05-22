import { useRouter } from 'next/router'
import { OnboardingCarousel } from '../carousel'
import { LoginDrawer } from '../loginDrawer'
import * as S from './styled'
import { StaticSEO } from '@/constants/seo'
import useDisclosure from '@/hooks/useDisclosure'

function OnboardingPageContainer() {
  const router = useRouter()
  const handleRouteRootPage = () => router.push('/')
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure()

  return (
    <S.Container>
      <h2 css={S.visuallyHidden}>{StaticSEO.onboarding.title}</h2>
      <OnboardingCarousel />
      <S.Box>
        <S.LoginBtn type="button" onClick={onOpen}>
          로그인
        </S.LoginBtn>
        <S.LookAroundBtn type="button" onClick={handleRouteRootPage}>
          둘러보기
        </S.LookAroundBtn>
      </S.Box>
      <LoginDrawer ref={dialoglRef} isOpen={isOpen} onClose={onClose} />
    </S.Container>
  )
}

export default OnboardingPageContainer
