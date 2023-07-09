import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Section = styled.section`
  ${({ theme }) => css`
    padding-top: 20px;
    background-color: ${theme.colors.white};
  `}
`

export const Head = styled.div`
  padding: 0 20px;
`

export const tabs = css`
  width: 100%;
  margin-bottom: 20px;
`

export const controller = css`
  margin-bottom: 10px;
`
