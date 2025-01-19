import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

export const Description = styled.p`
  text-align: center;
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
  `}
`;

export const RetryButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.primary};
  color: ${({ theme }) => theme.colors.gray[90]};
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
  `}
  font-weight: 600;
  border-radius: 6px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray[30]};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary.primary}E6`}; // 90% opacity
  }
`;
