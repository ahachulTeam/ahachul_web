import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import Navbar from './gnb/Navbar'

interface LayoutProps {
  Header?: React.ReactElement
}

const Layout = ({ children, Header }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      {Header}
      <Main>{children}</Main>
      <Navbar />
    </>
  )
}

const Main = styled.main`
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

export default Layout
