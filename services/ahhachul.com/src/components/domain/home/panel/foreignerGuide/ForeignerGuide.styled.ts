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

export const Card = styled.article`
  ${({ theme }) => css`
    margin-top: 12px;
    border-radius: 12px;
    background-color: ${theme.colors.gray[10]};
    padding: 12px 14px;
  `}
`;

export const Headline = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.labelLarge};
    color: ${theme.colors.gray[100]};
  `}
`;

export const Meta = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[80]};
    margin-top: 4px;
  `}
`;

export const Tips = styled.ul`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
    margin-top: 10px;
    padding-left: 14px;
    display: grid;
    gap: 4px;
  `}
`;

export const StateText = styled.p`
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
