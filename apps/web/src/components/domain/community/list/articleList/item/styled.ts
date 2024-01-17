// import { css, Theme } from '@emotion/react'
// import styled from '@emotion/styled'

// export const linkCss = css`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
// `

// export const Item = styled.li`
//   & > article {
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 16px 0;
//   }
// `

// export const ColumnFlex = styled.div`
//   ${({ theme }) => css`
//     position: relative;
//     flex: 1 0;
//     display: flex;
//     flex-direction: column;

//     & > h4 {
//       ${theme.fonts.bold16};
//       color: ${theme.colors.black};
//       margin-bottom: 8px;
//     }

//     & > p {
//       ${theme.fonts.regular14};
//       color: #808080;
//       font-weight: 300;
//     }
//   `}
// `

// export const RowFlex = styled.div`
//   display: flex;
//   flex-grow: 0;
//   gap: 20px;
// `

// export const Box = styled.span`
//   ${({ theme }) => css`
//     ${theme.fonts.regular12};
//     display: flex;
//     width: max-content;
//     padding-top: 4px;

//     & > span {
//       position: relative;
//       display: inline-block;
//       margin-right: 12px;
//       color: #bebebe;
//     }
//   `}
// `

// export const Thumbnail = styled.div`
//   ${({ theme }) => css`
//     position: relative;
//     display: flex;
//     align-self: center;
//     width: 36.54%;
//     aspect-ratio: 1 / 1;
//     box-shadow: 0 0 0 1px #f4f4f4 inset;
//     border-radius: 5px;
//     background-color: ${theme.colors.gray_18};
//     overflow: hidden;

//     & > img {
//       border-radius: 5px;
//     }
//   `}
// `

// export const CommentBox = styled.div`
//   ${({ theme }) => css`
//     position: absolute;
//     right: 0;
//     bottom: 0;
//     display: flex;
//     align-items: center;
//     column-gap: 4px;

//     & > span {
//       ${theme.fonts.regular12};
//       color: ${theme.colors.gray_35};
//     }
//   `}
// `

// export const visuallyHidden = (theme: Theme) => css`
//   ${theme.a11y.visuallyHidden}
// `

// export const SkeletonItem = styled.article`
//   position: relative;
//   display: grid;
//   grid-template-columns: 1fr 75px;
//   align-items: center;
//   column-gap: 16px;
//   padding: 15px 0;

//   &[data-view='grid'] {
//     grid-template-columns: none;
//     grid-template-rows: max-content 81px;
//     column-gap: 0;
//     row-gap: 12px;

//     & > div:first-of-type {
//       border-radius: 25px;
//     }
//   }

//   .skeleton {
//     display: flex;
//     flex: 1;
//   }
// `

// export const Contents = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   row-gap: 3px;
//   overflow: hidden;
// `

// export const Title = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     align-items: center;
//     column-gap: 5px;

//     & > h3 {
//       ${theme.fonts.bold16};
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//   `}
// `

// export const Content = styled.p`
//   ${({ theme }) => css`
//     ${theme.fonts.regular12};
//     display: -webkit-box;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
//     text-overflow: ellipsis;
//     overflow: hidden;
//   `}
// `

// export const Meta = styled.div`
//   ${({ theme }) => css`
//     ${theme.fonts.regular12};
//     display: flex;
//     justify-content: space-between;
//     color: ${theme.colors.gray_45};
//   `}
// `

// export const Metadata = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     align-items: center;
//     column-gap: 16px;

//     & > span {
//       position: relative;
//       display: flex;
//       align-items: center;

//       &:not(:last-of-type)::after {
//         content: '';
//         position: absolute;
//         right: -8px;
//         display: flex;
//         align-items: center;
//         width: 0.5px;
//         height: 10px;
//         background-color: ${theme.colors.gray_45};
//       }
//     }
//   `}
// `

// export const Utils = styled.div`
//   ${({ theme }) => css`
//     display: flex;
//     column-gap: 7px;
//     z-index: ${theme.zIndex.docked};
//   `}
// `

// export const UtilBtn = styled.button`
//   ${({ theme }) => css`
//     display: flex;
//     align-items: center;
//     column-gap: 5px;
//     transition: all 0.3s ease-in-out;

//     & > svg {
//       fill: ${theme.colors.gray_35};
//       transition: all 0.3s ease-in-out;
//     }

//     @media (hover: hover) {
//       &:hover {
//         color: ${theme.colors.primary};

//         & > svg {
//           fill: ${theme.colors.primary};
//         }
//       }
//     }
//   `}
// `

// export const ArticleList = styled.ul`
//   display: flex;
//   flex-direction: column;
//   padding: 0 16px 20px 16px;

//   & > li:not(:last-of-type) {
//     border-bottom: 1px solid #ececec;
//   }
// `

// export const customBadgeCss = css`
//   margin-bottom: 12px;
// `

// export const gapCss = css`
//   row-gap: 12px;
// `

export {};
