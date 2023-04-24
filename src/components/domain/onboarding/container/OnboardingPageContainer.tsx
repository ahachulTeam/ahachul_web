"use client";

import { LoginDrawer } from "../loginDrawer";

import useDisclosure from "@/hooks/useDisclosure";

import * as S from "./styled";

import { StaticSEO } from "@/constants";

function OnboardingPageContainer() {
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <h2 css={S.visuallyHidden}>{StaticSEO.main.title}</h2>
      <S.Box>
        <S.AuthGroup>
          <S.LoginBtn type="button" onClick={onOpen}>
            로그인
          </S.LoginBtn>
          <S.SignupBtn type="button">회원가입</S.SignupBtn>
        </S.AuthGroup>
        <S.LookAroundBtn type="button">둘러보기</S.LookAroundBtn>
      </S.Box>
      <LoginDrawer ref={dialoglRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default OnboardingPageContainer;
