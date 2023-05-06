"use client";

import { useRouter } from "next/navigation";

import { LoginDrawer } from "../loginDrawer";

import useDisclosure from "@/hooks/useDisclosure";

import { Carousel } from "@/components/common";

import { StaticSEO } from "@/constants/seo";

import { ONBOARDING_CAROUSELS } from "@/assets/static";

import * as S from "./styled";

function OnboardingPageContainer() {
  const router = useRouter();
  const handleRouteRootPage = () => router.push("/");
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure();

  return (
    <S.Container>
      <h2 css={S.visuallyHidden}>{StaticSEO.onboarding.title}</h2>
      <Carousel data={ONBOARDING_CAROUSELS} fade />
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
  );
}

export default OnboardingPageContainer;
