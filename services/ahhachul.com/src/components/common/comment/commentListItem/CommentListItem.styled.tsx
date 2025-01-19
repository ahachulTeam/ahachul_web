import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CommentWrapper = styled.div<{ asChild?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  padding: 16px 20px;
  ${({ asChild }) =>
    asChild &&
    css`
      padding-left: 40px;
    `}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const WriterName = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray[90]};
    font-size: 13px;
  `}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
`;

export const DeletedComment = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyLargeSemi};
    color: ${theme.colors.gray[90]};
  `}
`;

export const DateText = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const ReplyButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[90]};
    width: max-content;
  `}
`;

export const readonlyEditorCss = css`
  padding: 0;

  & > div {
    padding: 0;
    border: none;
  }
`;
