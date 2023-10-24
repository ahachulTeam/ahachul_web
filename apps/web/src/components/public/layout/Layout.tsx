import { PropsWithChildren } from 'react'

import { Navbar } from './navbar'
import * as S from './styled'

interface LayoutProps {
  Header?: React.ReactElement
}

export default function Layout({ children, Header }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {Header}
      <S.Main>{children}</S.Main>
      <Navbar />
    </>
  )
}
