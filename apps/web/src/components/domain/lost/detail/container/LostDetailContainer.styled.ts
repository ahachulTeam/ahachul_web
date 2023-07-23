import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Section = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`
