import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.fonts.thin29}
    margin-bottom: 12px;
  `}
`

export const Input = styled.input`
  display: block;
  width: 200px;
  height: 32px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 2px 16px;

  &[data-isvalid='true'] {
    border-color: #00baf6;
  }

  &[data-isvalid='false'] {
    border-color: red;
  }
`

export const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`

export const containerCss = css`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 70px 15px;
`

export const formCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: max-content;
  height: max-content;
  margin-bottom: 12px;
`

export const btnCss = css`
  width: max-content;
  height: 32px;
`
