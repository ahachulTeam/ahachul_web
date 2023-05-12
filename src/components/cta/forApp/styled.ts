import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { BottomSheet } from "@/components/common";

export const CTABottomSheet = styled(BottomSheet)`
  padding: 70px 20px 46px;
`;

export const ContentBox = styled.div`
  width: 100%;
  text-align: center;
  & > img {
    border-radius: 20px;
  }
`;

export const Strong = styled.strong`
  ${({ theme }) => css`
    ${theme.fonts.bold20};
    display: block;
    width: 100%;
    margin-top: 24px;
    color: ${theme.colors.black};
  `}
`;

export const P = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    padding: 8px 0 24px;
    color: ${theme.colors.gray_80};
  `}
`;

export const Link = styled.a`
  ${({ theme }) => css`
    ${theme.fonts.semibold14};
    ${theme.button.variant.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    max-width: 335px;
    margin: 0 auto;
    border-radius: 25px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
  `}
`;

export const CloseBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.medium14};
    width: 100%;
    height: 50px;
    max-width: 335px;
    margin: 0 auto;
    color: ${theme.colors.gray_40};
    background-color: ${theme.colors.white};
  `}
`;
