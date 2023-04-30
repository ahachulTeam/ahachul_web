import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
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
`;

export const LoginBtn = styled.button`
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
`;

export const LookAroundBtn = styled.button`
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
`;

export const H2 = styled.h2`
  ${({ theme }) => css`
    ${theme.a11y.visuallyHidden}
  `}
`;
