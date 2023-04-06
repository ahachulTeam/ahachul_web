"use client";

import { css, styled } from "styled-components";

import { LoginBottomSheet, OnboardingBanner } from "@/components";

import useDisclosure from "@/hooks/useDisclosure";

function OnBoardingPage() {
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <OnboardingBanner />
      <Box>
        <AuthGroup>
          <LoginBtn type="button" onClick={onOpen}>
            로그인
          </LoginBtn>
          <SignupBtn type="button">회원가입</SignupBtn>
        </AuthGroup>
        <LookAroundBtn type="button">둘러보기</LookAroundBtn>
      </Box>
      <LoginBottomSheet ref={dialoglRef} isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}

export default OnBoardingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 80px 16px 0 16px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AuthGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin-bottom: 35px;

  & > button:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0px;
    width: 1px;
    height: 12px;
    background-color: #e7e7e7;
    transform: translateY(-50%);
  }
`;

const LoginBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 90px;
    color: ${theme.colors.primary};
  `}
`;

const SignupBtn = styled(LoginBtn)`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.black};
  `}
`;

const LookAroundBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin: 0 auto;
    color: #c2c2c2;
    text-decoration: underline;
  `}
`;
