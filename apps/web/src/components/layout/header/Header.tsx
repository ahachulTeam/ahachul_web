import { A11yHeading } from '@ahhachul/ui'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback } from 'react'
import * as S from './styled'
import { ArrowIcon, KenllIcon, MiniHamburgerIcon, SearchIcon, ShareIcon } from '@/assets/icons'
import { StaticSEO } from '@/constants'

interface HeaderProps {
  hasGoBack?: boolean
  title?: string
  goBackToHome?: boolean
}

interface HeaderBtnProps {
  onClick: () => void
}

function HeaderMain({ hasGoBack = false, title = '', goBackToHome = false, children }: PropsWithChildren<HeaderProps>) {
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
          {hasGoBack && <Header.GoBack onClick={goBackToHome ? goHome : goBack} />}
          {!hasGoBack && <Header.Logo onClick={goHome} />}
        </S.LeftIcon>
        {title && <S.Title>{title}</S.Title>}
        <S.RightIcons>{children}</S.RightIcons>
      </S.Container>
    </S.Header>
  )
}

function GoBack({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <ArrowIcon />
    </S.IconBtn>
  )
}

function Logo({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn aria-label="아하철 홈" onClick={onClick}>
      <b>AhHa</b>chul
    </S.IconBtn>
  )
}

function Share({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <ShareIcon />
    </S.IconBtn>
  )
}

function TempSave({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn type="button" onClick={onClick}>
      임시저장
    </S.IconBtn>
  )
}

function Delete({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn type="button" onClick={onClick}>
      삭제
    </S.IconBtn>
  )
}

function Alarm({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <KenllIcon />
    </S.IconBtn>
  )
}

function Search({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <SearchIcon />
    </S.IconBtn>
  )
}

function MiniHamburger({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <MiniHamburgerIcon />
    </S.IconBtn>
  )
}

export const Header = Object.assign(HeaderMain, {
  GoBack,
  Logo,
  Share,
  TempSave,
  Delete,
  Alarm,
  Search,
  MiniHamburger,
})
