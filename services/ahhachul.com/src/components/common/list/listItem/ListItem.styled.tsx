import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DotIcon } from '@/assets/icons/system';

export const Article = styled.article`
  padding: 24px 0;
  border-bottom: 1px solid #f5f5f5;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.titleSmall};
    color: ${theme.colors.gray[90]};
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.gray[90]};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 66px;
  min-width: 66px;
  max-width: 66px;
  height: 66px;
  min-height: 66px;
  max-height: 66px;
`;

export const PostImage = styled(LazyLoadImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MetaInfo = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${theme.colors.gray[80]};
  `}
`;

export const StyledDotIcon = styled(DotIcon)`
  position: relative;
  top: 1px;
`;

export const CommentContainer = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    display: flex;
    align-items: center;
    gap: 2px;
    color: ${theme.colors.gray[80]};
  `}
`;

export const lexicalContentStyle = css`
  padding: 0;

  & > div > div {
    padding: 0;
    border: none;
    max-height: 46px;
    overflow: hidden;
  }
`;
