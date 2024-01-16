// import { css } from '@emotion/react'
// import styled from '@emotion/styled'

// export const ContentDetail = styled.article`
//   ${({ theme }) => css`
//     margin-bottom: 16px;
//     border-radius: 8px;
//     padding: 18px 30px 14px;
//     background-color: ${theme.colors.gray_05};

//     @media ${theme.breakPoint.device.desktop} {
//       margin-bottom: 26px;
//     }
//   `}
// `
// export const Title = styled.h3`
//   ${({ theme }) => css`
//     ${theme.fonts.medium16}
//     margin-bottom: 28px;
//     color: ${theme.colors.gray_75};
//   `}
// `

// export const DetailList = styled.dl`
//   ${({ theme }) => css`
//     display: grid;
//     grid-template-columns: 1fr;
//     row-gap: 28px;
//     margin-bottom: 15px;
//     border-bottom: 1px solid ${theme.colors.gray_17_05};
//     padding-bottom: 16px;

//     @media ${theme.breakPoint.device.tablet} {
//       grid-template-columns: repeat(2, 1fr);
//       grid-auto-flow: row dense;

//       & > div {
//         grid-column-start: 1;

//         &:nth-of-type(n + 4) {
//           grid-column-start: 2;
//         }
//       }
//     }
//   `}
// `

// export const Detailitem = styled.div`
//   ${({ theme }) => css`
//     position: relative;
//     display: grid;
//     grid-template-columns: 58px 1fr;
//     align-items: center;
//     column-gap: 73px;

//     &::before {
//       content: '';
//       position: absolute;
//       top: 0;
//       left: 100px;
//       width: 1px;
//       height: 100%;
//       background-color: ${theme.colors.gray_17_05};
//     }

//     &:not(:last-of-type)::before {
//       height: calc(100% + 28px);
//     }

//     dt {
//       ${theme.fonts.medium16};
//       color: ${theme.colors.gray_54};
//     }

//     dd {
//       ${theme.fonts.regular16};
//       color: ${theme.colors.gray_75};
//     }

//     @media ${theme.breakPoint.device.tablet} {
//       &:nth-of-type(3n)::before {
//         height: 100%;
//       }
//     }
//   `}
// `

// export const Status = styled.div`
//   ${({ theme }) => css`
//     ${theme.fonts.regular16};
//     display: flex;
//     align-items: center;
//     column-gap: 8px;
//     color: ${theme.colors.gray_75};

//     & > strong {
//       ${theme.fonts.medium16};
//     }
//   `}
// `

export {};
