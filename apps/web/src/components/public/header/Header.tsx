import { theme } from '@ahhachul/design-system'
import { A11yHeading } from '@ahhachul/ui'
import { NextRouter, useRouter } from 'next/router'
import { createContext, useCallback, useMemo, type PropsWithChildren, useContext } from 'react'

import * as S from './styled'
import { ArrowIcon, KenllIcon, MiniHamburgerIcon, SearchIcon, SettingIcon, ShareIcon } from '@/assets/icons'
import { PATH, PATH_STORAGE_KEYS, StaticSEO } from '@/constants'
import { useToast } from '@/hooks/global'
import { copyToClipboard } from '@/utils/global'

interface HeaderProps {
  hasLogo?: boolean
  hasGoBack?: boolean
  title?: string
  invisibleTitle?: boolean
  invisibleLeftIcon?: boolean
  goBackToHome?: boolean
  hasBorder?: boolean
  className?: string
}

interface HeaderBtnProps {
  isDisabled?: boolean
  onClick: () => void
}

interface HeaderContextValue {
  router: NextRouter
}

const HeaderContext = createContext({} as HeaderContextValue)

function HeaderMain({
  hasLogo = true,
  hasGoBack = false,
  title = '',
  invisibleTitle = false,
  invisibleLeftIcon = false,
  goBackToHome = false,
  hasBorder = true,
  children,
  className,
}: PropsWithChildren<HeaderProps>) {
  const storage = globalThis?.sessionStorage
  const router = useRouter()
  const goHome = useCallback(() => router.push(PATH.HOME), [router])
  const goBack = useCallback(() => {
    if (storage.getItem(PATH_STORAGE_KEYS.PREV_PATH) === '' || !storage.getItem(PATH_STORAGE_KEYS.PREV_PATH)) {
      router.push(PATH.HOME)
    } else {
      router.back()
    }
  }, [router, storage])

  const providerValue = useMemo(() => ({ router }), [router])

  return (
    <HeaderContext.Provider value={providerValue}>
      <S.Header className={className}>
        <S.Container hasBorder={hasBorder}>
          <A11yHeading>{StaticSEO.main.sitename}</A11yHeading>
          <S.LeftIcon css={invisibleLeftIcon && theme.a11y.visuallyHidden}>
            {hasGoBack && <Header.GoBack onClick={goBackToHome ? goHome : goBack} />}
            {!hasGoBack && hasLogo && <Header.Logo onClick={goHome} />}
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

function Share() {
  const toast = useToast()

  return (
    <S.IconBtn onClick={() => copyToClipboard(toast, window.location.href)}>
      <ShareIcon />
    </S.IconBtn>
  )
}

function TempSave({ onClick, isDisabled }: HeaderBtnProps) {
  return (
    <>
      <S.IconBtn type="button" onClick={onClick} disabled={isDisabled}>
        임시저장
      </S.IconBtn>
    </>
  )
}

function Alarm() {
  const { router } = useContext(HeaderContext)

  const handleRouteToAlarmPage = () => router.push({ pathname: PATH.ALARM, query: { category: 'all' } })

  return (
    <S.IconBtn type="button" onClick={handleRouteToAlarmPage}>
      <KenllIcon />
    </S.IconBtn>
  )
}

function Delete({ onClick }: HeaderBtnProps) {
  return <S.IconBtn onClick={onClick}>삭제</S.IconBtn>
}

function Setting({ onClick }: HeaderBtnProps) {
  return (
    <S.IconBtn onClick={onClick}>
      <SettingIcon />
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

function SearchBarWithRankingHashtags({ children, onClick }: PropsWithChildren<HeaderBtnProps>) {
  return <S.HashTagInput onClick={onClick}>{children}</S.HashTagInput>
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
  Setting,
  MiniHamburger,
  SearchBarWithRankingHashtags,
})
