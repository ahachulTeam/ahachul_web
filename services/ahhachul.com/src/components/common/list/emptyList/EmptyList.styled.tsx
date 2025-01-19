import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const EmptyContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding-top: 184px;

    & > p {
      ${theme.fonts.titleMedium};
      color: ${theme.colors.gray[80]};
    }
  `}
`;
