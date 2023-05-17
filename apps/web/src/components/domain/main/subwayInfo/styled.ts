import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const SubwayInfo = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    min-height: 180px;
    border-bottom: 1px solid ${theme.colors.primary};
    border-left: 1px solid ${theme.colors.primary};
    border-right: 1px solid ${theme.colors.primary};
    border-radius: 20px;
    background-color: ${theme.colors.white};
  `}
`

export const ThickBorderArea = styled.div`
  ${({ theme }) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 25px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${theme.colors.primary};
  `}
`

export const AhHachulLabel = styled.label`
  ${({ theme }) => css`
    ${theme.fonts.semibold16};
    position: absolute;
    top: 50%;
    left: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border: 3px solid ${theme.colors.primary};
    border-radius: 21px;
    padding: 8px 32px;
    background-color: ${theme.colors.white};
    transform: translateY(-50%);
  `}
`

export const SubwayIllustImage = styled.span`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
`

export const ContentArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 48px 24px 9px;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Desc = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular20};
    color: ${theme.colors.black};
    text-align: right;

    & > strong {
      ${theme.fonts.bold20};
      color: ${theme.colors.primary};
    }
  `}
`

export const AhHachulSuperModelImage = styled.div`
  position: absolute;
  top: 30px;
  left: 21px;
`

export const AddBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.bold14};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    height: 30px;
    color: ${theme.colors.black};
    position: relative;
    right: -8px;

    & > svg {
      transform: rotate(180deg) scale(0.5);

      & > path {
        stroke: ${theme.colors.primary};
        stroke-width: 3px;
      }
    }
  `}
`
