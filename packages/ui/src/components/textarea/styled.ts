import { theme } from '@ahhachul/design-system'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const TextareaContainer = styled.div`
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

export const TextareaWrapper = styled.div<{ size: 'sm' | 'md' }>`
  ${({ size }) => css`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${size === 'md' ? '162px' : '85px'};
    overflow: hidden;

    & > textarea {
      padding: ${size === 'md' ? '15px 25px' : '19px 25px'};
    }
  `}
`

export const Textarea = styled.textarea`
  ${theme.fonts.regular14};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 0;
  word-wrap: break-word;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.colors.gray_19} 0 0 0 1px inset;
  appearance: none;
  caret-color: ${theme.colors.primary};
  resize: none;

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
