import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mixins from '@/styles/mixins';

export const Panel = styled.div`
  ${mixins.animatedLayout(false)};
  ${mixins.fullWidth};
  ${mixins.flexColumn};
  gap: 36px;
  padding-top: 16px;
`;

export const Cell = styled.div`
  ${mixins.flexColumn};
  gap: 12px;
`;

export const Label = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    ${theme.fonts.titleLarge};
  `}
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 16px;
  border-radius: 8px;
  background-color: #eafcf1;

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  & > p {
    color: #67696f;
    font-size: 12px;
  }

  & > div {
    position: absolute;
    right: 16px;
    bottom: 10px;
  }

  & > svg {
    position: absolute;
    right: 16px;
    bottom: 10px;
  }
`;

const grid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  & > li:nth-of-type(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    height: 100px;
  }
`;

export const topSection = css`
  ${grid}

  & > li:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }

  & > li:nth-of-type(3) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    height: 100px;
  }

  & > li:nth-of-type(4) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    height: 84px;
  }
`;

export const bottomSection = css`
  ${grid}

  & > li:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    height: 100px;
  }

  & > li:nth-of-type(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    height: 84px;
  }
`;
