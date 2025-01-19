import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ArticleWrapper = styled.article``;

export const ContentWrapper = styled.div`
  padding: 20px 20px 24px;
`;

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.titleLarge};
    color: ${theme.colors.gray[90]};
    padding-top: 13px;
    padding-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const MetaInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

export const AuthorDateWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;

export const AuthorText = styled.span`
  color: ${({ theme }) => theme.colors.gray[80]};
`;

export const DateText = styled.span`
  color: ${({ theme }) => theme.colors.gray[70]};
`;

export const SubwayLineWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    display: flex;
    align-items: center;
    color: ${theme.colors.gray[90]};
    font-weight: 400;
  `}
`;

export const Lost112Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 56px;
  width: 100%;
  gap: 8px;
`;

export const Lost112Text = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[90]};
  `}
`;

export const ContentContainer = styled.div`
  padding: 0 20px;
`;

export const TextContent = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodyLargeSemi};
    color: ${theme.colors.gray[90]};
    padding: 0 0 24px;
    margin-bottom: 12px;
  `}
`;

export const LexicalContent = styled.div`
  padding: 0 0 24px;

  & > div {
    padding: 0;
    & > div > div {
      padding: 0;
      border: none;
    }
  }
`;
