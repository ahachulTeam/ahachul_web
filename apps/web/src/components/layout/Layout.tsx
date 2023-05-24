import { PropsWithChildren } from 'react'

import { Navbar } from './navbar'
import * as S from './styled'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <S.Main>{children}</S.Main>
      <Navbar />
    </>
  )
}
