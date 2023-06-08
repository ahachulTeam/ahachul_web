import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const ViewMore = styled.div`
  ${({ theme }) => css`
    & > span {
      ${theme.a11y.visuallyHidden};
    }
  `}
`
