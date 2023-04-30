import { Carousel } from "@/components/common";

import { StaticSEO } from "@/constants/seo";

import { ONBOARDING_CAROUSELS } from "@/assets/static";

import * as S from "./styled";

function OnboardingPageContainer() {
  return (
    <S.Container>
      <S.H2>{StaticSEO.onboarding.title}</S.H2>
      <Carousel data={ONBOARDING_CAROUSELS} fade />
      <S.Box>
        <S.LoginBtn type="button">로그인</S.LoginBtn>
        <S.LookAroundBtn type="button">둘러보기</S.LookAroundBtn>
      </S.Box>
    </S.Container>
  );
}

export default OnboardingPageContainer;
