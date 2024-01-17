// import { Theme, css } from '@emotion/react'
// import styled from '@emotion/styled'

// export const ContentsHeader = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     padding: 12px 28px;
//     border-bottom: 1px solid ${theme.colors.gray_20};
//   `}
// `

// export const Title = styled.h3`
//   ${({ theme }) => css`
//     ${theme.fonts.bold20};
//     margin-bottom: 8px;
//   `}
// `

// export const FragmentInfos = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     align-items: center;
//     column-gap: 6px;

//     & > span {
//       ${theme.fonts.regular14};
//       position: relative;
//       color: ${theme.colors.gray_40};
//     }
//   `}
// `

// export const ImageBox = styled.div`
//   max-width: 100%;
//   padding: 0 16px;

//   & > img {
//     object-fit: cover;
//     width: 100%;
//     height: 100%;
//     max-width: 100%;
//   }
// `

// export const DetailInfo = styled.pre`
//   ${({ theme }) => css`
//     ${theme.fonts.regular14};
//     line-height: 26px;
//     color: ${theme.colors.black};
//     white-space: pre-wrap;
//     word-break: break-all;
//     padding: 16px 28px;
//   `}
// `

// export const HashTagList = styled.ul`
//   display: flex;
//   flex-wrap: nowrap;
//   column-gap: 10px;
//   overflow-x: overlay;
//   -ms-overflow-style: none;
//   scrollbar-width: none;
//   padding: 16px 28px 20px 28px;

//   ::-webkit-scrollbar {
//     display: none;
//   }
// `

// export const ContentsReactBtnGroup = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     column-gap: 20px;
//     width: 100%;
//     padding: 20px;

//     & > button {
//       width: 100%;
//       border-radius: 10px;
//       color: ${theme.colors.gray_65};
//       font-weight: 400;
//     }
//   `}
// `

// export const imgCss = css`
//   padding: 0 20px;

//   & > figure {
//     border-radius: 10px;
//     overflow: hidden;
//     & > img {
//       width: 100%;
//     }

//     & > figcaption {
//       position: absolute !important;
//       width: 1px !important;
//       height: 1px !important;
//       padding: 0 !important;
//       margin: -1px !important;
//       overflow: hidden !important;
//       clip: rect(0, 0, 0, 0) !important;
//       white-space: nowrap !important;
//       border: 0 !important;
//     }
//   }

//   @media screen and (min-width: 768px) {
//     width: 100%;
//     max-width: 768px;
//     padding-bottom: 80px;
//     margin-right: auto;
//     margin-left: auto;
//   }
// `

// export const customButtonCss = (theme: Theme) => css`
//   display: flex;
//   gap: 4px;
//   align-items: center;
//   transition: all 0.3s ease-in-out;

//   & > svg > path {
//     transition: all 0.3s ease-in-out;
//   }

//   &[data-status='likes'] {
//     background-color: ${theme.colors.white};
//     color: ${theme.colors.primary};
//     max-width: 50%;

//     & > svg > path {
//       stroke: ${theme.colors.primary};
//     }

//     & > b {
//       color: ${theme.colors.secondary_active};
//     }
//   }
// `

// export const customTagCss = (theme: Theme) => css`
//   ${theme.fonts.regular14};
//   color: ${theme.colors.primary};
//   padding: 0;
// `

export {};
