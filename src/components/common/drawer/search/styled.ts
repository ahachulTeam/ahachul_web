import { css, Theme } from "@emotion/react";
import { defaultEasing } from "@/constants/motions";
import { type Variants } from "framer-motion";
import styled from "@emotion/styled";

export const overlayCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.dim};
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const contentCss = (theme: Theme) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: ${theme.zIndex.modal};
  width: 100%;
  max-width: ${theme.size.layout.width};
  height: 100%;
  padding: 10px 20px;
  background-color: white;
`;

export const searchDrawerVariants: Variants = {
  initial: {
    x: "10%",
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
  animate: {
    x: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
  exit: {
    x: "10%",
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: "transform",
  },
};

export const ModalHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SearchModalForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const IconBtn = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    height: 100%;
    padding: 0;

    & > svg {
      font-size: 20px;
      color: ${theme.colors.gray_80};
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    display: block;
    width: 100%;
    height: 40px;
    padding: 0 16px;
    padding-left: 40px;
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    color: ${theme.colors.gray_80};
    transition: background-color 200ms ease-in-out;
    appearance: none;

    &:active,
    &:focus {
      border: 1px solid ${theme.colors.primary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `}
`;

export const CancelButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    padding: 0 8px;
    font-weight: 700;
    border-radius: 4px;
    flex-grow: 0;
    flex-shrink: 0;
    width: 56px;
    height: 40px;
    margin-left: 8px;
    border: 0;
    color: ${theme.colors.gray_80};
    background-color: transparent;
    transition: color 200ms ease-in-out;
    cursor: pointer;

    &:not(:disabled):hover: {
      color: ${theme.colors.gray_90};
    }

    &:disabled: {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `}
`;

export const SearchHistory = styled.section`
  width: 100%;
`;

export const SearchHistoryHeader = styled.div`
  ${({ theme }) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  & > span, & > button {
     ${theme.fonts.regular14};
    color: ${theme.colors.gray_80};
    border: 0;
    margin: 0;
    padding: 0;
    background-color: inherit;
  },
  `}
`;
