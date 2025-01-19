import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DotIcon } from '@/assets/icons/system';

export const ArticleWrapper = styled.article`
  padding: 24px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FlexContainer = styled.div`
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

export const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AuthorDateContainer = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    color: ${theme.colors.gray[80]};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;

export const StyledDotIcon = styled(DotIcon)`
  position: relative;
  top: 1px;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50px;
  min-width: 50px;
  aspect-ratio: 1;
`;

export const StyledLazyImage = styled(LazyLoadImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;
