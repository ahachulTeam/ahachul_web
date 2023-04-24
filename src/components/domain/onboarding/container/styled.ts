import { css, styled } from "styled-components";

import { theme } from "@/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 80px 16px 0 16px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AuthGroup = styled.div`
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

export const LoginBtn = styled.button`
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

export const SignupBtn = styled(LoginBtn)`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.black};
  `}
`;

export const LookAroundBtn = styled.button`
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

export const visuallyHidden = css`
  ${theme.a11y.visuallyHidden}
`;
