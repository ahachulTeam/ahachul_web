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

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: ${theme.size.layout.width};
    height: 100%;
    margin: 0 auto;
    border-bottom: 1px solid ${theme.colors.gray_20};
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
`
