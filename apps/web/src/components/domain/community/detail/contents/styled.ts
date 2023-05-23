import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.bold20};
    margin-bottom: 10px;
  `}
`

export const FragmentInfos = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    & > div {
      display: flex;
      align-items: center;
      column-gap: 12px;

      & > span {
        ${theme.fonts.regular14};
        position: relative;
        color: ${theme.colors.gray_40};

        &:not(:last-of-type)::after {
          content: '';
          position: absolute;
          top: 48%;
          right: -6px;
          width: 1px;
          height: 10px;
          background-color: ${theme.colors.gray_40};
          transform: translateY(-58%);
        }
      }
    }
  `}
`

export const ImageBox = styled.div``

export const DetailInfo = styled.pre`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    line-height: 26px;
    margin-bottom: 10px;
    color: ${theme.colors.black};
    white-space: pre-wrap;
    word-break: break-all;
  `}
`

export const HashTagList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: nowrap;
    column-gap: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${theme.colors.gray_17};
    overflow-x: overlay;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
  `}
`

export const ContentsReactBtnGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    width: 100%;
    padding: 15px 0;

    & > button {
      width: 100%;
      border-radius: 10px;
      color: ${theme.colors.gray_65};
      font-weight: 400;
    }
  `}
`
