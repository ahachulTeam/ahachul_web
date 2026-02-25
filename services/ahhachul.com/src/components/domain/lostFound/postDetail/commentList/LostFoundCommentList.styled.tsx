import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Section = styled.section``;

export const HeaderWrapper = styled.div`
  height: 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[30]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const CommentCountWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[80]};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;

export const SortButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SortButton = styled.button<{ active?: boolean }>`
  ${({ theme, active }) => css`
    ${theme.fonts.bodySmall};
    border-radius: 8px;
    border: 1px solid ${active ? theme.colors.keyColor : theme.colors.gray[40]};
    background-color: ${active ? theme.colors.keyColor : theme.colors.white};
    color: ${active ? theme.colors.white : theme.colors.gray[90]};
    padding: 4px 8px;
    transition: all 0.15s ease;
  `}
`;
