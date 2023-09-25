import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Header = styled.header`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${theme.size.header.height};
    background-color: ${theme.colors.white};
    overflow: hidden;
    transition: max-height 500ms cubic-bezier(0.43, 0.03, 0.15, 0.95);
    z-index: ${theme.zIndex.header};
  `}
`

interface HeaderContainerProps {
  hasBorder?: boolean
}
export const Container = styled.div<HeaderContainerProps>`
  ${({ theme, hasBorder }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: ${theme.size.layout.width};
    height: 100%;
    margin: 0 auto;
    border-bottom: ${hasBorder ? `1px solid ${theme.colors.gray_20}` : 'none'};
    padding: 0 16px;
  `}
`

export const LeftIcon = styled.div`
  all: unset;
  cursor: pointer;
`

export const RightIcons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
  height: 100%;
`

export const Title = styled.h2`
  ${({ theme }) => css`
    ${theme.fonts.bold20};
  `}
`

export const IconBtn = styled.button`
  all: unset;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors.gray_40};
  }
`

export const HashTagInput = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    ${theme.common.flexAlignCenter};
    ${theme.common.flexGrowOne};
    position: relative;
    width: 100%;
    height: 40px;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    border-radius: 110px;
    padding-left: 20px;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      font-size: 14px;
      background: #fff;

      display: flex;
      align-items: center;
    }
  `}
`
