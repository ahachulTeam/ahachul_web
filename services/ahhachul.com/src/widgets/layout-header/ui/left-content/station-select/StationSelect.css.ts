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
  padding: 8px 12px;
  border-radius: 6px;
  color: #f0f4ff;
  font-size: 18px;
  font-weight: bold;
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 120%;
  left: 12px;
  width: 192px;
  overflow: hidden;
`;

export const option = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 6px;
  color: #334155;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
  &:hover {
    background-color: #e0e7ff;
    color: #6366f1;
  }
`;
