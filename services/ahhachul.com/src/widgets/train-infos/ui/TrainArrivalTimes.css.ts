import { css, Interpolation, Theme } from '@emotion/react';

export const listWrap = {
  position: 'relative',
  margin: '72px 0 0',
} as Interpolation<Theme>;

export const arrivalList = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  column-gap: 24px;
  row-gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(210, 210, 210, 0.09);

  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    transition: opacity 0.2s ease;

    &:active {
      opacity: 0.7;
    }

    & > li > b:first-of-type {
      font-weight: bold;
    }

    & > b {
      color: #ffffff;
      font-size: 14px;
    }

    & > span {
      color: #28b2ff;
      font-size: 14px;
    }
  }
`;
