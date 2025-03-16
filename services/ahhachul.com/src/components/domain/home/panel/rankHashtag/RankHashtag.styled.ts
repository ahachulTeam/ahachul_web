import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DotIcon } from '@/assets/icons/system';
import { mixins } from '@/styles';

export const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.gray[20]};

    b {
      ${mixins.sideGutter};
      ${theme.fonts.titleSmall};
      color: ${theme.colors.gray[100]};
    }
  `}
`;

export const HashtagList = styled.ul`
  ${({ theme }) => css`
    margin: 16px 18px 24px;
    border-radius: 12px;
    background-color: ${theme.colors.gray[10]};
    overflow: hidden;
  `}
`;

export const TopRankBox = styled.article`
  ${({ theme }) => css`
    height: 76px;
    padding: 16px 22px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: ${theme.colors.gray[90]};
    display: flex;
    flex-direction: column;
    position: relative;

    & > b {
      padding: 0;
      ${theme.fonts.titleMedium};
      color: ${theme.colors.white};
    }

    & > span {
      ${theme.fonts.bodyMedium};
      color: ${theme.colors.white};
    }

    & > svg {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  `}
`;

export const RankList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`;

export const RankContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 8px;

    &:not(:last-of-type) {
      border-bottom: 1px solid ${theme.colors.gray[20]};
    }

    & > div {
      display: flex;
      align-items: center;

      & > span {
        ${theme.fonts.bodyLarge};
        color: ${theme.colors['key-color']};
        min-width: 18px;
      }

      & > b {
        padding: 0;
        ${theme.fonts.bodyLarge};
        ${theme.colors.gray[90]};
      }
    }

    & > span {
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[90]};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
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
