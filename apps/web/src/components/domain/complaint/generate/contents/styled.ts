import { fonts, colors } from '@ahhachul/design-system'
import { css } from '@emotion/react'

import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  gap: 15px;
  flex-direction: column;
  padding: 20px;
`

export const Title = styled.h3`
  ${fonts.medium14};
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
`

export const TextArea = styled.textarea`
  ${fonts.regular14};
  display: flex;
  align-items: center;
  height: 85px;
  width: 100%;
  border: 1px solid ${colors.gray_19};
  border-radius: 20px;
  padding: 12px 25px;
  resize: none;

  &::placeholder {
    ${fonts.regular14};
    color: ${colors.gray_40};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red_10};
  }
`

export const TemperatureSection = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 15px;
  row-gap: 18px;
  width: 100%;
`

export const TemperatureCardStyle = (key: string) => css`
  padding: 22px 23px;

  ${key === 'hot' &&
  css`
    & > h4 {
      text-align: right;
    }
  `}
`
