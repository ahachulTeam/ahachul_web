import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const TriggerBtn = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    width: 81px;
    height: 29px;
    border-radius: 65px;
    color: ${theme.colors.gray_55};
    background-color: ${theme.colors.gray_20};
    transition: all 0.3s ease-in-out;

    & > svg {
      stroke: ${theme.colors.gray_55};
      transform: rotate(0);
      transition: all 0.3s ease-in-out;
    }

    &[aria-expanded='true'],
    &[aria-selected='true'] {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.secondary};
      & > svg {
        stroke: ${theme.colors.primary};
      }
    }

    &[aria-expanded='true'] > svg {
      transform: rotate(180deg);
    }
  `}
`

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Option = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    height: 40px;

    &[aria-checked='true'] {
      ${theme.fonts.bold14};
      color: ${theme.colors.primary};
    }
  `}
`
