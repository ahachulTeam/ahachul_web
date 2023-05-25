import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const TriggerBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    border: 1px solid ${theme.colors.gray_19};
    border-radius: 110px;
    color: ${theme.colors.gray_40};
    background-color: ${theme.colors.white};
    transition: all 0.3s ease-in-out;

    & > span {
      margin-left: 25px;
    }

    & > svg {
      margin-right: 15px;
      transform: rotate(180deg);
      transition: all 0.3s ease-in-out;

      & > path {
        stroke: ${theme.colors.gray_40};
      }
    }

    &[aria-selected='true'] {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.secondary};
      border-color: white;

      & > svg {
        opacity: 0;
      }
    }
  `}
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Lines = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 10px;
`

export const Option = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin-right: 16px;
    margin-bottom: 15px;
    border-radius: 20px;
    color: ${theme.colors.gray_53};
    background-color: ${theme.colors.gray_07};
    transition: all 0.3s ease-in-out;

    &[aria-checked='true'] {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.secondary};
    }
  `}
`
