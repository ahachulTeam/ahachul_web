import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mixins from '@/styles/mixins';

export const Panel = styled.div`
  ${mixins.fullWidth}
  ${mixins.flexColumn}
  ${mixins.sideGutter}
  gap: 36px;
  background-color: ${({ theme }) => theme.colors.white};
`;

// export const Label = styled.span`
//   color: ${({ theme }) => theme.color.text[50]};
//   font-size: ${({ theme }) => theme.typography.fontSize[16]}px;
//   font-weight: ${({ theme }) => theme.typography.fontWeight[600]};
//   margin-bottom: 16px;
// `;

// export const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   position: relative;
//   padding: 16px;
//   border-radius: 8px;
//   background-color: ${({ theme }) => theme.color.black[500]};

//   span {
//     color: ${({ theme }) => theme.color.text[50]};
//     font-size: ${({ theme }) => theme.typography.fontSize[16]}px;
//     font-weight: ${({ theme }) => theme.typography.fontWeight[600]};
//     margin-bottom: 8px;
//   }

//   & > p {
//     color: ${({ theme }) => theme.color.blueDarkGray[500]};
//     font-size: ${({ theme }) => theme.typography.fontSize[12]}px;
//   }

//   & > div {
//     position: absolute;
//     right: 16px;
//     bottom: 10px;
//   }
// `;

// export const CardStats = styled.article`
//   position: absolute;
//   right: 16px;
//   bottom: 10px;
//   text-align: right;

//   span {
//     color: ${({ theme }) => theme.color.blueDarkGray[500]};
//     font-size: ${({ theme }) => theme.typography.fontSize[12]}px;
//   }

//   p {
//     color: ${({ theme }) => theme.color.white[700]};
//     font-size: ${({ theme }) => theme.typography.fontSize[12]}px;
//     margin-top: 4px;
//     margin-bottom: 6px;
//   }

//   div {
//     color: ${({ theme }) => theme.color.skyBlue[500]};
//     font-size: ${({ theme }) => theme.typography.fontSize[48]}px;
//     font-weight: ${({ theme }) => theme.typography.fontWeight[600]};
//   }
// `;

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
