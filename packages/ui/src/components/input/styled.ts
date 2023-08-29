import { theme } from '@ahhachul/design-system'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`

export const LabelWrapper = styled.div<{ hideLabel?: boolean }>`
  ${({ hideLabel }) => css`
    padding: 0 5px;
    ${hideLabel && theme.a11y.visuallyHidden};
  `}
`

export const Label = styled.label`
  ${theme.fonts.medium14};
`

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  overflow: hidden;
`

export const Input = styled.input`
  ${theme.fonts.regular14};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 110px;
  border: 0;
  padding: 0 25px;
  box-shadow: 0 0 0 1px inset ${theme.colors.gray_19};
  background-color: ${theme.colors.white};
  appearance: none;
  caret-color: ${theme.colors.primary};

  &::placeholder {
    color: ${theme.colors.gray_30};
  }

  &:focus {
    box-shadow: 0 0 0 1px inset ${theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 3em ${theme.colors.white} inset;
  }
`
