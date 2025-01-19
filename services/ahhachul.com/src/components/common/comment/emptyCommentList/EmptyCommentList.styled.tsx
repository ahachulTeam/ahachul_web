import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 64px 0 128px;
`;

export const Desc = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    & > p {
      ${theme.fonts.titleMedium};
      color: ${theme.colors.gray[80]};
    }
  `}
`;
