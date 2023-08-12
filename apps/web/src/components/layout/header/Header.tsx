import { theme } from '@ahhachul/design-system'
import { A11yHeading } from '@ahhachul/ui'
import { createContext, useCallback, useMemo, type PropsWithChildren, useContext } from 'react'
import * as S from './styled'
import { ArrowIcon, KenllIcon, MiniHamburgerIcon, SearchIcon, ShareIcon } from '@/assets/icons'
import { PATH, PATH_STORAGE_KEYS, StaticSEO } from '@/constants'
import { usePushShallowRouter } from '@/hooks'
import { useToast } from '@/hooks'
import { UrlQueryType } from '@/types/common'
import { copyToClipboard } from '@/utils/common'

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
  pushShallowRouter: (pathname: string, query?: UrlQueryType) => Promise<boolean>
}

const HeaderContext = createContext({} as HeaderContextValue)

function HeaderMain({
  hasGoBack = false,
  title = '',
  invisibleTitle = false,
  goBackToHome = false,
  children,
}: PropsWithChildren<HeaderProps>) {
  const storage = globalThis?.sessionStorage
  const { router, pushShallowRouter } = usePushShallowRouter()
  const goHome = useCallback(() => pushShallowRouter(PATH.HOME), [pushShallowRouter])
  const goBack = useCallback(() => {
    if (storage.getItem(PATH_STORAGE_KEYS.PREV_PATH) === '' || !storage.getItem(PATH_STORAGE_KEYS.PREV_PATH)) {
      router.push(PATH.HOME)
    } else {
      router.back()
    }
  }, [router, storage])

  const providerValue = useMemo(() => ({ pushShallowRouter }), [pushShallowRouter])

  return (
    <HeaderContext.Provider value={providerValue}>
      <S.Header>
        <S.Container>
          <A11yHeading>{StaticSEO.main.sitename}</A11yHeading>
          <S.LeftIcon>
            {hasGoBack && <Header.GoBack onClick={goBackToHome ? goHome : goBack} />}
            {!hasGoBack && <Header.Logo onClick={goHome} />}
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
  const { pushShallowRouter } = useContext(HeaderContext)

  const handleRouteToAlarmPage = () => pushShallowRouter(PATH.ALARM, { category: 'all' })

  return (
    <S.IconBtn type="button" onClick={handleRouteToAlarmPage}>
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
