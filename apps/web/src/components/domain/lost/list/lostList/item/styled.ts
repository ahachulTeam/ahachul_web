import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const LostItem = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 75px 1fr;
  align-items: center;
  column-gap: 16px;

  &[data-view='grid'] {
    grid-template-columns: none;
    grid-template-rows: max-content 81px;
    column-gap: 0;
    row-gap: 12px;

    & > div:first-of-type {
      border-radius: 25px;
    }
  }
`

export const link = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Thumbnail = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 100%;
    aspect-ratio: 75 / 69;
    border-radius: 5px;
    background-color: ${theme.colors.gray_18};
    overflow: hidden;
  `}
`

export const Contents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 3px;
  overflow: hidden;
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 5px;

    & > h3 {
      ${theme.fonts.bold16};
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`

export const Content = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `}
`

export const Meta = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    display: flex;
    justify-content: space-between;
    color: ${theme.colors.gray_45};
  `}
`

export const Metadata = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 16px;

    & > span {
      position: relative;
      display: flex;
      align-items: center;

      &::after {
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

export const Utils = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: 7px;
    z-index: ${theme.zIndex.docked};
  `}
`

export const UtilBtn = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 5px;
    transition: all 0.3s ease-in-out;

    & > svg {
      fill: ${theme.colors.gray_35};
      transition: all 0.3s ease-in-out;
    }

    @media (hover: hover) {
      &:hover {
        color: ${theme.colors.primary};

        & > svg {
          fill: ${theme.colors.primary};
        }
      }
    }
  `}
`
