import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const WelcomeMessageHeading = styled.h1`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    ${theme.fonts.headlineSmall};
    min-height: 56px;

    color: ${theme.colors.white};
    background-color: ${theme.colors.gray[100]};

    b {
      font-weight: 700;
    }

    b:first-of-type {
      display: block;
    }
  `}
`;

export const SkeletonHeading = styled.div`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    min-height: 56px;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    align-items: center;
  `}
`;

export const SkeletonBar = styled.span`
  ${({ theme }) => css`
    width: 164px;
    height: 18px;
    border-radius: 999px;
    background: ${theme.colors.gray[80]};
  `}
`;
