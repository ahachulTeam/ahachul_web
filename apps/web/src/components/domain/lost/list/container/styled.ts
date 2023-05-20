import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Section = styled.section`
  ${({ theme }) => css`
    padding: 19px 0;
    background-color: ${theme.colors.white};
  `}
`

export const tabs = css`
  width: 100%;
  margin-bottom: 19px;
`

export const controller = css`
  margin-bottom: 8px;
`

export const Head = styled.div`
  padding: 0 19px;
`
