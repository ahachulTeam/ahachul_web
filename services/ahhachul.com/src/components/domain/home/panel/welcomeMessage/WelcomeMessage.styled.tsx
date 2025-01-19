import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const WelcomeMessageHeading = styled.h1`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    ${theme.fonts.headlineSmall};

    color: ${theme.colors.black};

    b {
      font-weight: 700;
    }

    b:first-of-type {
      display: block;
    }
  `}
`;
