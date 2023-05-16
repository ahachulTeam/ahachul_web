<<<<<<< HEAD
=======
import { LoginDrawer } from "../loginDrawer";

import useDisclosure from "@/hooks/useDisclosure";

>>>>>>> develop
import { StaticSEO } from "@/constants/seo";

import { ONBOARDING_CAROUSELS } from "@/assets/static";

import * as S from "./styled";
import { Carousel } from "../carousel";
import { useRouter } from "next/router";

function OnboardingPageContainer() {
  const router = useRouter();
<<<<<<< HEAD
=======
  const handleRouteRootPage = () => router.push("/");
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure();
>>>>>>> develop

  return (
    <S.Container>
      <h2 css={S.visuallyHidden}>{StaticSEO.onboarding.title}</h2>
      <Carousel data={ONBOARDING_CAROUSELS} fade />
      <S.Box>
<<<<<<< HEAD
        <S.LoginBtn type="button">로그인</S.LoginBtn>
        <S.LookAroundBtn type="button" onClick={() => router.push("/")}>
=======
        <S.LoginBtn type="button" onClick={onOpen}>
          로그인
        </S.LoginBtn>
        <S.LookAroundBtn type="button" onClick={handleRouteRootPage}>
>>>>>>> develop
          둘러보기
        </S.LookAroundBtn>
      </S.Box>
      <LoginDrawer ref={dialoglRef} isOpen={isOpen} onClose={onClose} />
    </S.Container>
  );
}

export default OnboardingPageContainer;
