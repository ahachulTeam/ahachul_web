import { css, Interpolation, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const section = [
  mixins.fullWidth,
  mixins.flexColumn,
  {
    marginTop: '16px',
    marginBottom: '30px',
  },
] as Interpolation<Theme>;

export const FallbackCard = styled.article`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    min-height: 220px;
    border-radius: 12px;
    background-color: ${theme.colors.gray[100]};
    display: grid;
    align-content: center;
    gap: 10px;
    padding-top: 14px;
    padding-bottom: 14px;
  `}
`;

export const FallbackTitle = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.titleSmall};
    color: ${theme.colors.white};
  `}
`;

export const FallbackDescription = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[30]};
  `}
`;

export const ActionButton = styled.button`
  ${({ theme }) => css`
    margin-top: 4px;
    height: 34px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[30]};
    background: ${theme.colors.gray[10]};
    color: ${theme.colors.gray[100]};
    ${theme.fonts.labelSmall};
    font-weight: 700;
  `}
`;

export const SkeletonCard = styled(FallbackCard)`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray[100]};
    gap: 12px;
  `}
`;

export const SkeletonTitle = styled.span`
  ${({ theme }) => css`
    display: block;
    width: 142px;
    height: 18px;
    border-radius: 999px;
    background-color: ${theme.colors.gray[70]};
  `}
`;

export const SkeletonBody = styled.span`
  ${({ theme }) => css`
    display: block;
    width: 100%;
    height: 140px;
    border-radius: 10px;
    background-color: ${theme.colors.gray[80]};
  `}
`;
