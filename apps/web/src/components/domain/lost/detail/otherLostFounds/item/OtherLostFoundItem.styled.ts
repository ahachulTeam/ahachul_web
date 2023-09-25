import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const OtherLostFounditem = styled.article`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: center;
    column-gap: 12px;

    @media ${theme.breakPoint.device.tablet} {
      grid-template-columns: none;
      grid-template-rows: max-content 44px;
      column-gap: 0;
      row-gap: 6px;
    }
  `}
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
    aspect-ratio: 1/1;
    border-radius: 5px;
    background-color: ${theme.colors.gray_18};
    overflow: hidden;
  `}
`

export const Contents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 6px;
  overflow: hidden;
`

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.regular16};
    white-space: nowrap;
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
