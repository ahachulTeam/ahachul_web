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

export const Description = styled.p`
  ${({ theme }) => css`
    margin-top: 6px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const HelperText = styled.p`
  ${({ theme }) => css`
    margin-top: 8px;
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const Grid = styled.ul`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const SkeletonCard = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 76px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[20]};
    background: ${theme.colors.gray[30]};
  `}
`;

export const CardButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    text-align: left;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[20]};
    background: ${theme.colors.gray[10]};
    padding: 10px;
    display: grid;
    gap: 4px;
  `}
`;

export const CardTitle = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelLarge};
    color: ${theme.colors.gray[100]};
  `}
`;

export const CardMeta = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const ForeignerActions = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 6px;
`;

export const ForeignerButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    height: 34px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[30]};
    background-color: ${theme.colors.gray[10]};
    color: ${theme.colors.gray[90]};
    ${theme.fonts.labelSmall};
    font-weight: 600;
  `}
`;
