import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Title = styled.h5`
  ${({ theme }) => css`
    ${theme.fonts.thin23};
    color: ${theme.colors.primary};
    margin-bottom: 24px;
  `}
`

export const ContentList = styled.ul`
  width: 100%;
`

export const Item = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;

    & > span {
      ${theme.fonts.regular14};
      color: ${theme.colors.black};
    }
  `}
`

export const CallBtn = styled.a`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 20px;
    padding: 0 18px;
    color: ${theme.colors.gray_53};
    background-color: ${theme.colors.gray_10};
    transition: all 0.3s ease-in-out;

    @media (hover: hover) {
      &:not(:disabled):hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.primary};
      }
    }

    &:active {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
    }
  `}
`
