import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ListItem = styled.li`
  ${({ theme }) => css`
    width: 100%;
    border-bottom: 1px solid ${theme.colors.gray20};
    padding: 0 2px;
    transition: 0.3s;

    &:last-of-type {
      border-color: transparent;
    }

    @media (hover: hover) {
      &:hover {
        border-color: ${theme.colors.gray40};
      }
    }
  `}
`;

export const ListItemSkeleton = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${theme.colors.gray20};
    padding: 20px 18px;
  `}
`;

export const ContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AnchorWrapper = styled.a`
  display: flex;
  padding: 20px 18px;
`;

interface MetadataProps {
  isRecommend: boolean;
}

export const Metadata = styled.div<MetadataProps>`
  ${({ theme, isRecommend }) => css`
    ${isRecommend ? theme.fonts.semibold16 : theme.fonts.semibold17};
    display: none;
    align-items: center;
    width: 48px;
    height: inherit;
    color: ${isRecommend ? theme.colors.blue30 : theme.colors.black};

    @media ${theme.breakPoint.device.tablet} {
      display: flex;
    }
  `}
`;

interface TitleProps {
  isRecommend?: boolean;
}

export const Title = styled.h3<TitleProps>`
  ${({ theme, isRecommend = false }) => css`
    ${theme.fonts.semibold17};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${theme.colors.black};

    &::before {
      content: ${isRecommend ? "'[맞춤] '" : null};
      color: ${theme.colors.blue30};
    }

    @media ${theme.breakPoint.device.tablet} {
      &::before {
        display: none;
      }
    }
  `}
`;

export const titleSkeleton = css`
  width: 100%;
  max-width: 500px;
  height: 28px;
`;

export const DescList = styled.dl`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    min-width: 0;
    width: 100%;
    max-width: 100%;
    margin-top: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    @media ${theme.breakPoint.device.tablet} {
      margin-top: 4px;
    }
  `}
`;

export const Desc = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular15};
    position: relative;
    display: flex;
    color: ${theme.colors.gray70};

    & > dt {
      ${theme.a11y.visuallyHidden};
      white-space: nowrap;

      &::after {
        content: ':';
      }
    }

    &:not(:last-of-type) {
      margin-right: 25px;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -12px;
        width: 1px;
        height: 12px;
        background-color: ${theme.colors.gray30};
        transform: translateY(-50%);
      }
    }

    @media ${theme.breakPoint.device.tablet} {
      & > dt {
        ${theme.a11y.clearHidden};
        margin-right: 4px;
      }

      &:first-of-type > dt {
        ${theme.a11y.visuallyHidden};
      }

      & > dd {
        width: max-content;
      }
    }
  `}
`;

export const TagList = styled.ul`
  ${({ theme }) => css`
    display: none;
    column-gap: 8px;
    margin-top: 12px;

    @media ${theme.breakPoint.device.tablet} {
      display: flex;
    }
  `}
`;

export const tag = css`
  &:disabled {
    cursor: default;
  }
`;

export const CheckItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 20px;
    max-width: inherit;
    border-bottom: 1px solid ${theme.colors.gray20};
    padding: 20px;
    transition: 0.3s;

    &:last-of-type {
      border-color: transparent;
    }

    @media (hover: hover) {
      &:hover {
        border-color: ${theme.colors.gray40};
      }
    }
  `}
`;

export const Content = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Anchor = styled.a`
  display: block;
`;

export const ListCard = styled.li`
  ${({ theme }) => css`
    width: 384px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray20};
    background-color: ${theme.colors.white};
    transition: 0.3s;

    @media (hover: hover) {
      &:hover {
        box-shadow: ${theme.boxShadows.card};
      }
    }
  `}
`;

export const CardAnchor = styled.a`
  display: block;
  padding: 16px 24px;

  ${({ theme }) => css`
    & > h3 {
      ${theme.fonts.semibold15};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 8px;
      color: ${theme.colors.black};
      text-overflow: ellipsis;
      overflow: hidden;
    }

    & > span {
      ${theme.fonts.regular14};
      color: ${theme.colors.gray70};
    }
  `}
`;
