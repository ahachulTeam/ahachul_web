import { css } from '@emotion/react';

export const arrivalList = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  column-gap: 24px;
  row-gap: 12px;

  & > li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    transition: opacity 0.2s ease;

    &:active {
      opacity: 0.7;
    }

    & > b {
      color: #ffffff;
      font-size: 14px;
      font-weight: normal;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 75%;
    }

    &:first-of-type > b,
    &:first-of-type > span {
      font-weight: bold;
    }

    & > span {
      color: #00baf6;
      font-size: 14px;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
