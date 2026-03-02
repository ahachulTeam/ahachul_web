import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { mixins } from '@/styles';

export const Container = styled.section`
  ${({ theme }) => css`
    ${mixins.sideGutter};
    padding-top: 24px;
    background-color: ${theme.colors.gray[20]};
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;

  > div > b {
    ${({ theme }) => css`
      ${theme.fonts.titleSmall};
      color: ${theme.colors.gray[100]};
    `}
  }
`;

export const Title = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    margin-top: 6px;
    color: ${theme.colors.gray[70]};
  `}
`;

export const MoreButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors['key-color']};
    background: transparent;
  `}
`;

export const StateText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
    margin-top: 10px;
  `}
`;

export const ErrorText = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.red[60]};
    margin-top: 10px;
  `}
`;

export const StoryList = styled.ul`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;

  li {
    flex: 0 0 auto;
  }
`;

export const StoryButton = styled.button`
  width: 84px;
  border: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const StoryRing = styled.span`
  width: 68px;
  height: 68px;
  border-radius: 999px;
  padding: 2px;
  background: linear-gradient(145deg, #2acf6c, #4f46e5, #2c80d9);
  display: inline-flex;

  img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.colors.gray[10]};
  }
`;

export const Nickname = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.labelSmall};
    color: ${theme.colors.gray[100]};
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const Meta = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.caption};
    color: ${theme.colors.gray[70]};
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const ViewerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ViewerCard = styled.article`
  ${({ theme }) => css`
    width: min(420px, 100%);
    max-height: 92vh;
    border-radius: 20px;
    overflow: hidden;
    background: ${theme.colors.gray[100]};
    box-shadow: 0 20px 52px rgba(0, 0, 0, 0.44);
  `}
`;

export const ViewerTop = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;

    b {
      ${theme.fonts.labelLarge};
      color: ${theme.colors.white};
    }

    p {
      ${theme.fonts.caption};
      margin-top: 4px;
      color: ${theme.colors.gray[60]};
    }

    button {
      ${theme.fonts.labelSmall};
      border-radius: 999px;
      border: 1px solid ${theme.colors.gray[70]};
      background: rgba(255, 255, 255, 0.08);
      color: ${theme.colors.gray[20]};
      padding: 5px 10px;
    }
  `}
`;

export const ViewerImage = styled.img`
  width: 100%;
  height: min(66vh, 480px);
  object-fit: cover;
`;

export const ViewerCaption = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    padding: 12px;
    color: ${theme.colors.gray[30]};
  `}
`;

export const ViewerActions = styled.div`
  padding: 0 12px 14px;

  button {
    ${({ theme }) => css`
      ${theme.fonts.labelMedium};
      width: 100%;
      height: 36px;
      border-radius: 10px;
      border: 1px solid ${theme.colors.gray[60]};
      color: ${theme.colors.gray[20]};
      background: rgba(255, 255, 255, 0.08);
    `}
  }
`;
