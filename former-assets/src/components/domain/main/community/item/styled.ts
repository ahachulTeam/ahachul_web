import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Item = styled.li`
  & > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
    padding: 26px 0;
  }
`;

export const Flex = styled.div`
  ${({ theme }) => css`
    flex: 1 0;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    height: 100%;

    & > h4 {
      ${theme.fonts.bold16};
      color: ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.regular12};
      color: #6e6e6e;
      font-weight: 300;
    }
  `}
`;

export const Box = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;

    & > b {
      ${theme.fonts.regular12};
      display: flex;
      justify-content: center;
      align-items: center;
      width: max-content;
      height: 20px;
      border-radius: 3px;
      padding: 2px 8px;
      color: ${theme.colors.white};
      background-color: #bc2a38;
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

export const visuallyHidden = (theme: Theme) => css`
  ${theme.a11y.visuallyHidden}
`;
