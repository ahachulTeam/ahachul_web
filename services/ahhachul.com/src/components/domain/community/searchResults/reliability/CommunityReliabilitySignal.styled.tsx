import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { CommunityReliabilityBadgeLevel } from '@/types';

export const Container = styled.section`
  ${({ theme }) => css`
    margin: 12px 20px 0;
    padding: 14px 16px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 14px;
    background: ${theme.colors.white};
    box-shadow: 0 6px 18px rgba(18, 18, 18, 0.06);
  `}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.gray[100]};
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    margin-top: 8px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[90]};
  `}
`;

export const MutedText = styled.p`
  ${({ theme }) => css`
    margin-top: 4px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[80]};
  `}
`;

export const Confidence = styled.p`
  ${({ theme }) => css`
    margin-top: 6px;
    ${theme.fonts.labelSmall};
    color: ${theme.colors['key-color']};
  `}
`;

export const Badge = styled.span<{ level: CommunityReliabilityBadgeLevel }>`
  ${({ theme, level }) => {
    let tone = {
      background: theme.colors.gray[30],
      color: theme.colors.gray[90],
    };

    if (level === 'SPIKE') {
      tone = {
        background: theme.colors.red,
        color: theme.colors.white,
      };
    } else if (level === 'ELEVATED') {
      tone = {
        background: theme.colors.primary.primary_hover,
        color: theme.colors.gray[100],
      };
    }

    return css`
      padding: 4px 10px;
      border-radius: 999px;
      ${theme.fonts.labelSmall};
      background: ${tone.background};
      color: ${tone.color};
      white-space: nowrap;
    `;
  }}
`;

export const ActionButton = styled.button`
  ${({ theme }) => css`
    margin-top: 8px;
    border-radius: 999px;
    border: 1px solid ${theme.colors.gray[40]};
    padding: 6px 12px;
    ${theme.fonts.labelSmall};
    color: ${theme.colors.gray[90]};
    background: ${theme.colors.gray[10]};
  `}
`;

export const SkeletonLine = styled.div<{ width: string }>`
  ${({ theme, width }) => css`
    width: ${width};
    height: 12px;
    border-radius: 8px;
    background: ${theme.colors.gray[30]};

    &:not(:first-of-type) {
      margin-top: 8px;
    }
  `}
`;
