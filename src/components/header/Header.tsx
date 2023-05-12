import Image from "next/image";
import defaultUserImg from "public/illust/img/img_userDefault.png";

import { LogoLink } from "@/components/common";

import { KenllIcon, ProfileIcon, SearchIcon } from "@/assets/icons";

import * as S from "./styled";
import { useRouter } from "next/router";
import { useDisclosure } from "@/hooks";
import SearchDrawer from "../common/drawer/search/SearchDrawer";

// import { useAuth } from "@/context";

function Header() {
  const { pathname } = useRouter();
  const isAuthed = false;
  // const { isAuthed, initializing } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isCummunity = true;

  return (
    <S.Header data-show={pathname !== "/onboarding"}>
      <S.Container>
        <LogoLink />
        <S.Box>
          <S.MenuBtn aria-label="내 프로필 보기 버튼">
            {isCummunity ? (
              <SearchIcon onClick={onOpen} />
            ) : (
              <>
                {isAuthed ? (
                  <ProfileIcon />
                ) : (
                  <Image
                    src={defaultUserImg}
                    alt="내 프로필 보기 버튼"
                    width={24}
                    height={24}
                    priority
                  />
                )}
              </>
            )}
          </S.MenuBtn>
          <S.MenuBtn aria-label="내 알람 보기 버튼">
            <KenllIcon />
          </S.MenuBtn>
        </S.Box>
        <SearchDrawer containerId="modal-root" isMounted={isOpen} onClose={onClose} />
      </S.Container>
    </S.Header>
  );
}

export default Header;
