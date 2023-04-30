import Image from "next/image";
import { usePathname } from "next/navigation";
import defaultUserImg from "public/illust/img/img_userDefault.png";

import { LogoLink } from "@/components/common";

import { KenllIcon, ProfileIcon } from "@/assets/icons";

import * as S from "./styled";

// import { useAuth } from "@/context";

function Header() {
  const pathname = usePathname();
  const isAuthed = false;
  // const { isAuthed, initializing } = useAuth();

  return (
    <S.Header data-show={pathname !== "/onboarding"}>
      <S.Container>
        <LogoLink />
        <S.Box>
          <S.MenuBtn aria-label="내 프로필 보기 버튼">
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
          </S.MenuBtn>
          <S.MenuBtn aria-label="내 알람 보기 버튼">
            <KenllIcon />
          </S.MenuBtn>
        </S.Box>
      </S.Container>
    </S.Header>
  );
}

export default Header;
