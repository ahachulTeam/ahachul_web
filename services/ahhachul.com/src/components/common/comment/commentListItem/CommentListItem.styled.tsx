import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CommentWrapper = styled.div<{ asChild?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
  background-color: ${({ theme }) => theme.colors.gray[10]};
  padding: 14px 20px;
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
  padding-bottom: 4px;
`;

export const WriterName = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.gray[90]};
    font-size: 14px;
    font-weight: 600;
  `}
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 8px;
`;

export const DeletedComment = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.gray[90]};
  `}
`;

export const ImagePreviewList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-top: 2px;

  li {
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray[20]};
    background: ${({ theme }) => theme.colors.white};
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: 82px;
    object-fit: cover;
  }
`;

export const DateText = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `}
`;

export const ReplyButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[90]};
    width: max-content;
  `}
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LikeButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[80]};
    width: max-content;
  `}
`;

export const readonlyEditorCss = css`
  padding: 0;

  & > div > div {
    padding: 0;
    border: none;
    background-color: var(--ah-color-gray-10);

    & > p {
      line-height: 150%;
    }
  }
`;
