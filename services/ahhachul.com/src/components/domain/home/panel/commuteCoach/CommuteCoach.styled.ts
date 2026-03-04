import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';
import type { CommuteCoachRiskLevel } from '@/types';

type RiskBadgeProps = {
  riskLevel: CommuteCoachRiskLevel;
};

export const Container = styled.section`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    padding-top: 24px;
    background-color: ${theme.colors.gray[20]};
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > b {
    ${({ theme }) => css`
      ${theme.fonts.titleSmall};
      color: ${theme.colors.gray[100]};
    `}
  }
`;

export const RefreshButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors['key-color']};
    background-color: transparent;
  `}
`;

export const Card = styled.article`
  ${({ theme }) => css`
    margin-top: 12px;
    border-radius: 12px;
    background-color: ${theme.colors.gray[10]};
    padding: 12px 14px;
  `}
`;

export const SkeletonCard = styled(Card)`
  ${({ theme }) => css`
    min-height: 140px;
    display: grid;
    align-content: center;
    gap: 10px;
    background-color: ${theme.colors.gray[30]};
  `}
`;

export const SkeletonBar = styled.span<{ short?: boolean }>`
  ${({ theme, short = false }) => css`
    display: block;
    width: ${short ? '48%' : '80%'};
    height: 14px;
    border-radius: 999px;
    background-color: ${theme.colors.gray[50]};
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > p {
    ${({ theme }) => css`
      ${theme.fonts.labelLarge};
      color: ${theme.colors.gray[100]};
    `}
  }
`;

export const RiskBadge = styled.span<RiskBadgeProps>`
  ${({ theme, riskLevel }) => {
    let tone: { background: string; border: string; color: string } = {
      background: theme.colors.legacy.surface.danger_tint,
      border: theme.colors.legacy.status.danger,
      color: theme.colors.legacy.status.danger,
    };

    if (riskLevel === 'LOW') {
      tone = {
        background: theme.colors.green[50],
        border: theme.colors.green[200],
        color: theme.colors.green[800],
      };
    } else if (riskLevel === 'MEDIUM') {
      tone = {
        background: theme.colors.gray[20],
        border: theme.colors.gray[40],
        color: theme.colors.gray[80],
      };
    }

    return css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${tone.border};
      background-color: ${tone.background};
      color: ${tone.color};
      border-radius: 999px;
      padding: 2px 8px;
    `;
  }}
`;

export const MetaList = styled.ul`
  ${({ theme }) => css`
    margin-top: 10px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[90]};
    display: grid;
    gap: 4px;
  `}
`;

export const RouteSummary = styled.div`
  ${({ theme }) => css`
    margin-top: 10px;
    border: 1px solid ${theme.colors.gray[20]};
    border-radius: 10px;
    background-color: ${theme.colors.gray[20]};
    padding: 8px 10px;

    > p {
      ${theme.fonts.labelSmall};
      color: ${theme.colors.gray[100]};
    }

    > span {
      display: block;
      margin-top: 4px;
      ${theme.fonts.labelSmall};
      color: ${theme.colors.gray[70]};
    }
  `}
`;

export const StateText = styled.p`
  ${({ theme }) => css`
    margin-top: 10px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const ErrorText = styled.p`
  ${({ theme }) => css`
    margin-top: 10px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.legacy.status.danger};
  `}
`;

export const HelperText = styled.p`
  ${({ theme }) => css`
    margin-top: 10px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const RiskReasonList = styled.ul`
  ${({ theme }) => css`
    margin-top: 8px;
    display: grid;
    gap: 4px;

    > li {
      ${theme.fonts.labelSmall};
      color: ${theme.colors.gray[70]};

      &::before {
        content: '· ';
      }
    }
  `}
`;
