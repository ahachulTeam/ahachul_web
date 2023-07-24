import { colors, fonts } from '@ahhachul/design-system'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { RadioButtonOption } from './RadioButton.types'

const getConditionalOptionStyle = (options: RadioButtonOption[]) => {
  switch (options.length) {
    case 2:
      return css`
        grid-template-columns: 1fr 1fr;
        border-radius: 110px;
      `
    case 3:
      return css`
        grid-template-columns: 1fr 1fr 1fr;
        border-radius: 110px;
      `
    case 4:
      return css`
        grid-template-columns: 1fr 1fr;
        border-radius: 20px;
      `
    case 6:
      return css`
        grid-template-columns: 1fr 1fr 1fr;
        border-radius: 20px;
      `
  }
}

export const RadioButton = styled.div<{ $options: RadioButtonOption[] }>`
  display: grid;
  grid-gap: 1px;
  overflow: hidden;
  background-color: ${colors.gray_19};
  border: 1px solid ${colors.gray_19};
  cursor: pointer;

  & > div {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  ${({ $options }) => getConditionalOptionStyle($options)}
`

export const Label = styled.label`
  ${fonts.regular14}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  height: 44px;
  color: ${colors.gray_40};
  background-color: ${colors.white};
  cursor: pointer;

  > span {
    padding: 0 8px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &[aria-selected='true'] {
    ${fonts.bold14}
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`
