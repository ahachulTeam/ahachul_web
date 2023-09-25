import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ContentHeader = styled.div`
  margin-bottom: 16px;
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: 8px;
    align-items: center;
    margin-bottom: 16px;

    @media ${theme.breakPoint.device.desktop} {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 16px;
    }
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    ${theme.fonts.bold20};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`

export const Metadata = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    display: flex;
    align-items: center;
    column-gap: 16px;
    color: ${theme.colors.gray_45};

    & > span {
      position: relative;
      display: flex;
      align-items: center;

      &:first-of-type::after {
        content: '';
        position: absolute;
        right: -8px;
        display: flex;
        align-items: center;
        width: 0.5px;
        height: 10px;
        background-color: ${theme.colors.gray_45};
      }
    }
  `}
`
