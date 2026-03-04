import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const Container = styled.section`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    padding-top: 24px;
    background-color: ${theme.colors.gray[20]};

    > b {
      ${theme.fonts.titleSmall};
      color: ${theme.colors.gray[100]};
    }
  `}
`;

export const SectionCard = styled.article`
  ${({ theme }) => css`
    margin-top: 12px;
    border-radius: 12px;
    background-color: ${theme.colors.gray[10]};
    padding: 12px 14px;
  `}
`;

export const SkeletonRow = styled.span<{ short?: boolean }>`
  ${({ theme, short = false }) => css`
    display: block;
    width: ${short ? '56%' : '88%'};
    height: 14px;
    border-radius: 999px;
    background-color: ${theme.colors.gray[30]};

    &:not(:first-of-type) {
      margin-top: 8px;
    }
  `}
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SectionTitle = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelLarge};
    color: ${theme.colors.gray[100]};
  `}
`;

export const MoreButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors['key-color']};
    background-color: transparent;
  `}
`;

export const EmptyText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
    margin-top: 10px;
  `}
`;

export const ErrorText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.red[60]};
    margin-top: 10px;
  `}
`;

export const PostList = styled.ul`
  margin-top: 6px;
`;

export const PostItem = styled.li`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  }
`;
