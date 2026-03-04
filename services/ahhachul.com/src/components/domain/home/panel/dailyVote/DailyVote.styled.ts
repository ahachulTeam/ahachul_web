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

export const HeaderRow = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const PrimaryActionButton = styled.button`
  ${({ theme }) => css`
    height: 32px;
    border-radius: 8px;
    border: 1px solid ${theme.colors['key-color']};
    background: ${theme.colors.white};
    color: ${theme.colors['key-color']};
    padding: 0 12px;
    ${theme.fonts.labelSmall};
    font-weight: 600;
  `}
`;

export const Card = styled.article`
  ${({ theme }) => css`
    margin-top: 10px;
    border-radius: 12px;
    background-color: ${theme.colors.gray[10]};
    padding: 12px 14px;
  `}
`;

export const IntroCard = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray[20]};
    border-radius: 10px;
    padding: 10px;
    background-color: ${theme.colors.gray[10]};
  `}
`;

export const IntroTitle = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelLarge};
    color: ${theme.colors.gray[100]};
  `}
`;

export const IntroDescription = styled.p`
  ${({ theme }) => css`
    margin-top: 4px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const PollCard = styled.article`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray[20]};
    border-radius: 10px;
    background-color: ${theme.colors.gray[10]};
    padding: 10px;
  `}

  &:not(:first-of-type) {
    margin-top: 10px;
  }
`;

export const PollHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const PollMeta = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const DetailButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors['key-color']};
    background: transparent;
  `}
`;

export const Question = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.gray[100]};
    margin-top: 6px;
  `}
`;

export const OptionPreviewList = styled.ul`
  margin-top: 8px;
  display: grid;
  gap: 6px;
`;

export const OptionPreviewItem = styled.li<{ selected: boolean }>`
  ${({ theme, selected }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid ${selected ? theme.colors['key-color'] : theme.colors.gray[30]};
    background: ${selected ? theme.colors.green[100] : theme.colors.gray[10]};
    color: ${selected ? theme.colors['key-color'] : theme.colors.gray[90]};
    padding: 8px 10px;
    ${theme.fonts.labelSmall};
  `}
`;

export const PollFooter = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TotalVoteText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const StationDiaryCard = styled(PollCard)`
  ${({ theme }) => css`
    border-color: ${theme.colors.green[200]};
    background-color: ${theme.colors.green[50]};
  `}
`;

export const HelperText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
    margin-top: 10px;
  `}
`;

export const EmptyText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const ErrorText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.red[60]};
  `}
`;
