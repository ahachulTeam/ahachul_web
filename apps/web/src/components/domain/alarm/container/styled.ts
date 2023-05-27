import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Section = styled.section`
  width: 100%;
`

export const Fixed = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: ${theme.size.header.height};
    width: 100%;
    max-width: ${theme.size.layout.width};
    margin: 0 auto;
    background-color: ${theme.colors.white};
  `}
`

export const Container = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.size.tab.height};
  `}
`
