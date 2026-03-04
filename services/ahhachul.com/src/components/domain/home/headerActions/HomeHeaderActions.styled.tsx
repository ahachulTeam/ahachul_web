import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const button = css`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 90px;

  border-radius: 6px;
  padding: 8px 4px;

  color: var(--ah-color-white);
  font-size: 18px;
  font-weight: bold;

  & > span {
    height: 17px;

    & > svg > g > path {
      fill: var(--ah-color-white);
    }
  }
`;

export const fallbackButton = css`
  min-width: 64px;
  justify-content: center;
  padding: 8px 10px;
`;

export const skeletonButton = css`
  width: 90px;
  min-width: 90px;
  height: 34px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.28);
  color: transparent;
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 192px;
  background-color: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);

  overflow: hidden;
  position: absolute;
  top: 26px;
  left: -94px;
`;

export const option = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 6px;
  padding: 12px 8px;
  background-color: white;
  color: var(--ah-color-black);
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s;

  &:first-of-type {
    font-weight: 700;
  }

  &:hover {
    transform: scale(1.02);
    background-color: var(--ah-color-legacy-surface-hover);
  }

  &:active {
    transform: scale(0.93);
    background-color: var(--ah-color-legacy-surface-hover);
  }
`;

export const Container = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, 36px);
  align-items: center;
  gap: 2px;
`;

export const navigationButtonStyle = css`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
