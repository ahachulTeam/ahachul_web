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

  border-radius: 6px;
  padding: 8px 12px;

  color: #f0f4ff;
  font-size: 18px;
  font-weight: bold;
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 192px;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);

  overflow: hidden;
  position: absolute;
  top: 120%;
  left: 12px;
`;

export const option = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 6px;
  padding: 8px;

  color: #334155;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:active {
    background-color: #c7d2fe;
    color: #4f46e5;
  }
  @media (hover: hover) {
    &:hover {
      background-color: #e0e7ff;
      color: #6366f1;
    }
  }
`;
