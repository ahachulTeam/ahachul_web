import { css, styled } from "styled-components";

import { BOTTOM_SHEET_DURATION } from "@/constants";

export const Dim = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.dim};
    z-index: ${theme.zIndex.dim};
  `}
`;

<<<<<<< HEAD
export const BottomSheet = styled.dialog`
  ${({ theme }) => css`
=======
interface BottomSheetlProps {
  isShow: boolean;
}

export const BottomSheet = styled.dialog<BottomSheetlProps>`
  ${({ theme, isShow }) => css`
>>>>>>> develop
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: ${theme.size.layout.width};
    border-radius: 20px 20px 0px 0px;
    padding: 0;
    background-color: ${theme.colors.white};
<<<<<<< HEAD
    transform: translateY(100%);
    transition: transform ${BOTTOM_SHEET_DURATION}ms ease 0s;
    z-index: ${theme.zIndex.dialog};

    &[data-isshow="true"] {
      transform: translateY(0);
    }
=======
    transform: ${isShow ? "translateY(0)" : "translateY(100%)"};
    transition: transform ${BOTTOM_SHEET_DURATION}ms ease 0s;
    z-index: ${theme.zIndex.dialog};
>>>>>>> develop
  `}
`;

export const Header = styled.header`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 68px;

    & > h2 {
      ${theme.fonts.semibold16};
    }
  `}
`;

export const CloseBtn = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: 20px;
    width: 28px;
    height: 28px;
    padding: 4px;

    & > svg {
      fill: ${theme.colors.gray_40};
    }
  `}
`;

export const Content = styled.div`
  padding: 0 42px 36px 42px;
`;
