import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 64px 0 128px;
`;

export const Desc = styled.div`
  ${({ theme }) => css`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 4px;

    & > p {
      ${theme.fonts.titleMedium};
      color: ${theme.colors.gray[80]};
    }
  `}
`;

export const RetryBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.black};
    margin-top: 20px;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${theme.colors.gray[20]};
  `}
`;
