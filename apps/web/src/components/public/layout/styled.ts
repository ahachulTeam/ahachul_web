import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: ${theme.size.layout.width};
    height: 100%;
    min-height: ${`calc(100vh - ${theme.size.bottomNavbar.height})`};
    max-height: 100%;
    padding-top: ${theme.size.header.height};
    padding-bottom: ${theme.size.bottomNavbar.height};
    background-color: ${theme.colors.white};
  `}
`
