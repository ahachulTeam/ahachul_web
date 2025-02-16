import { css } from '@emotion/react';

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

  color: #272727;
  font-size: 18px;
  font-weight: bold;

  & > span {
    height: 17px;
  }
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

  color: #272727;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:first-of-type {
    font-weight: 700;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #e0e7ff;
      color: #6366f1;
    }
  }
`;
