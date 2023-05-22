import { useDisclosure } from '@ahhachul/lib'
import Image from 'next/image'
import { useRouter } from 'next/router'

import defaultUserImg from 'public/illust/img/img_userDefault.png'
import * as S from './styled'
import { KenllIcon, ProfileIcon, SearchIcon } from '@/assets/icons'
import { LogoLink } from '@/components/common'
import SearchDrawer from '@/components/common/drawer/search/SearchDrawer'

// import { useAuth } from "@/context";

function Header() {
  const { pathname } = useRouter()
  const isAuthed = false
  // const { isAuthed, initializing } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isCummunity = true

  return (
    <S.Header data-show={pathname !== '/onboarding'}>
      <S.Container>
        <LogoLink />
        <S.Box>
          <>
            {isCummunity ? (
              <S.MenuBtn onClick={onOpen}>
                <SearchIcon />
              </S.MenuBtn>
            ) : (
              <>
                {isAuthed ? (
                  <S.MenuBtn>
                    <ProfileIcon />
                  </S.MenuBtn>
                ) : (
                  <Image src={defaultUserImg} alt="내 프로필 보기 버튼" width={24} height={24} priority />
                )}
              </>
            )}
          </>
          <S.MenuBtn aria-label="내 알람 보기 버튼">
            <KenllIcon />
          </S.MenuBtn>
        </S.Box>
        <SearchDrawer isMounted={isOpen} onClose={onClose} />
      </S.Container>
    </S.Header>
  )
}

export default Header
