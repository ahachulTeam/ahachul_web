import { theme } from '@ahhachul/design-system'
import { A11yHeading } from '@ahhachul/ui'
import { createContext, useCallback, useMemo, type PropsWithChildren, useContext } from 'react'
import * as S from './styled'
import { ArrowIcon, KenllIcon, MiniHamburgerIcon, SearchIcon, ShareIcon } from '@/assets/icons'
import { PATH, StaticSEO } from '@/constants'
import { usePushShallowRouter } from '@/hooks'

interface HeaderProps {
  hasGoBack?: boolean
  title?: string
  invisibleTitle?: boolean
  goBackToHome?: boolean
}

interface HeaderBtnProps {
  onClick: () => void
  isDisabled?: boolean
}

interface HeaderContextValue {
  pushShallowRouter: (path: string) => () => Promise<boolean>
}

const HeaderContext = createContext({} as HeaderContextValue)

function HeaderMain({
  hasGoBack = false,
  title = '',
  invisibleTitle = false,
  goBackToHome = false,
  children,
}: PropsWithChildren<HeaderProps>) {
  const { router, pushShallowRouter } = usePushShallowRouter()
  const goBack = useCallback(() => router.back(), [router])
  const goHome = useCallback(() => pushShallowRouter(PATH.HOME), [pushShallowRouter])

  const providerValue = useMemo(() => ({ pushShallowRouter }), [pushShallowRouter])

  return (
    <HeaderContext.Provider value={providerValue}>
      <S.Header>
        <S.Container>
          <A11yHeading>{StaticSEO.main.sitename}</A11yHeading>
          <S.LeftIcon>
            {hasGoBack && <Header.GoBack onClick={goBackToHome ? goHome() : goBack} />}
            {!hasGoBack && <Header.Logo onClick={goHome()} />}
          </S.LeftIcon>
          <S.Title css={invisibleTitle && theme.a11y.visuallyHidden}>{title}</S.Title>
          <S.RightIcons>{children}</S.RightIcons>
        </S.Container>
      </S.Header>
    </HeaderContext.Provider>
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

function TempSave({ onClick, isDisabled }: HeaderBtnProps) {
  return (
    <S.IconBtn type="button" onClick={onClick} disabled={isDisabled}>
      임시저장
    </S.IconBtn>
  )
}

function Alarm() {
  const { pushShallowRouter } = useContext(HeaderContext)

  return (
    <S.IconBtn type="button" onClick={pushShallowRouter(`${PATH.ALARM}?category=all`)}>
      <KenllIcon />
    </S.IconBtn>
  )
}

function Delete({ onClick }: HeaderBtnProps) {
  return <S.IconBtn onClick={onClick}>삭제</S.IconBtn>
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
