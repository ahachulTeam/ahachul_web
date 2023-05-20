import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Item = styled.li`
  & > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
    padding: 15px 0;
  }
`;

export const Flex = styled.div`
  ${({ theme }) => css`
    flex: 1 0;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
    height: 100%;

    & > h4 {
      ${theme.fonts.bold14};
      color: ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.regular12};
      color: #272727;
      font-weight: 300;
    }
  `}
`;

export const Image = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

  & > img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export const Box = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    display: flex;
    width: max-content;
    padding-top: 4px;

    & > span:first-of-type {
      position: relative;
      display: inline-block;
      margin-right: 12px;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -6px;
        width: 1px;
        height: 12px;
        background-color: #c3c3c3;
      }
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
