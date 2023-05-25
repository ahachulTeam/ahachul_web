import { A11yHeading } from '@ahhachul/ui'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback } from 'react'
import * as S from './styled'
import { ArrowIcon, KenllIcon, MiniHamburgerIcon, SearchIcon, ShareIcon } from '@/assets/icons'
import { StaticSEO } from '@/constants'

interface HeaderProps {
  hasGoBack?: boolean
  title?: string
}

interface HeaderBtnProps {
  onClick: () => void
}

function Header({ hasGoBack = false, title = '', children }: PropsWithChildren<HeaderProps>) {
  const router = useRouter()
  const goBack = useCallback(() => router.back(), [router])
  const goHome = useCallback(() => {
    const { pathname } = router
    if (pathname !== '/') {
      return router.push('/', undefined, { shallow: true })
    }
  }, [router])

  return (
    <S.Header>
      <S.Container>
        <A11yHeading>{StaticSEO.main.sitename}</A11yHeading>
        <S.LeftIcon>
          {hasGoBack && <Header.GoBack onClick={goBack} />}
          {!hasGoBack && <Header.Logo onClick={goHome} />}
        </S.LeftIcon>
        {title && <S.Title>{title}</S.Title>}
        <S.RightIcons>{children}</S.RightIcons>
      </S.Container>
    </S.Header>
  )
}

export default Header

Header.GoBack = function GoBack({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <ArrowIcon />
    </S.IconBtn>
  )
}

Header.Logo = function Logo({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn aria-label="아하철 홈" onClick={onClick}>
      <b>AhHa</b>chul
    </S.IconBtn>
  )
}

Header.Share = function Share({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <ShareIcon />
    </S.IconBtn>
  )
}

Header.TempSave = function TempSave({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn type="button" onClick={onClick}>
      임시저장
    </S.IconBtn>
  )
}

Header.Alarm = function Alarm({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <KenllIcon />
    </S.IconBtn>
  )
}

Header.Search = function Search({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <SearchIcon />
    </S.IconBtn>
  )
}

Header.MiniHamburger = function MiniHamburger({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <MiniHamburgerIcon />
    </S.IconBtn>
  )
}
