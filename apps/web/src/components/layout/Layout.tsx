import { PropsWithChildren } from 'react'

import { Header } from './header'
import { Navbar } from './navbar'
import * as S from './styled'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <S.Main>{children}</S.Main>
      <Navbar />
    </>
  )
}
