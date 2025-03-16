import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const WelcomeMessageHeading = styled.h1`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    ${theme.fonts.headlineSmall};

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
