/* eslint-disable @typescript-eslint/no-shadow */
import { css, styled } from "styled-components";

import { theme } from "@/styles";

export const NavItem = styled.li`
  ${({ theme }) => css`
    & > a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      column-gap: 16px;
      padding: 26px 0;
      border-bottom: 1px soild ${theme.colors.gray_20};
    }
  `}
`;

export const Flex = styled.div`
  ${({ theme }) => css`
    flex: 1 0;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    height: 100%;

    & > h4 {
      ${theme.fonts.bold18};
      color: ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.regular12};
      color: ${theme.colors.black};
      font-weight: 300;
    }
  `}
`;

export const Box = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    & > span {
      ${theme.fonts.regular12};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      border-radius: 3px;
      padding: 2px 8px;
      color: ${theme.colors.white};
      background-color: #bc2a38;
      text-align: center;
    }
  `}
`;

export const ImgBox = styled.div`
  ${({ theme }) => css`
    position: relative;
    flex: 0 0;
    min-width: 35.7%;
    min-height: 100%;
    border-radius: 5px;
    background-color: ${theme.colors.gray_40};
  `}
`;

export const visuallyHidden = css`
  ${theme.a11y.visuallyHidden}
`;
