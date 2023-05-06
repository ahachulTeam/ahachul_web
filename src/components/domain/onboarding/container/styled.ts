<<<<<<< HEAD
import { css, styled } from "styled-components";
=======
/* eslint-disable @typescript-eslint/no-shadow */
import { css, ExecutionContext, styled } from "styled-components";
>>>>>>> develop

import { theme } from "@/styles";

export const Container = styled.div`
<<<<<<< HEAD
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
=======
  position: relative;
  display: flex;
  flex-direction: column;
  justify-contents: space-between;
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

export const Box = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100%;
  transform: translateX(-50%);
>>>>>>> develop
`;

export const LoginBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    display: flex;
<<<<<<< HEAD
    position: relative;
    align-items: center;
    justify-content: center;
    height: 90px;
=======
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 9vh;
    max-height: 90px;
>>>>>>> develop
    color: ${theme.colors.primary};
  `}
`;

<<<<<<< HEAD
export const SignupBtn = styled(LoginBtn)`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.black};
  `}
`;

=======
>>>>>>> develop
export const LookAroundBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    align-items: center;
    justify-content: center;
<<<<<<< HEAD
    width: max-content;
    margin: 0 auto;
=======
    width: 100%;
    height: 9vh;
    max-height: 90px;
>>>>>>> develop
    color: #c2c2c2;
    text-decoration: underline;
  `}
`;

<<<<<<< HEAD
export const visuallyHidden = css`
=======
export const visuallyHidden = ({ theme }: ExecutionContext) => css`
>>>>>>> develop
  ${theme.a11y.visuallyHidden}
`;
