import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Tab = styled.button`
  ${({ theme }) => css`
    ${theme.tab.body36};

    @media ${theme.breakPoint.device.tablet} {
      ${theme.tab.body40};
    }
  `}
`;
