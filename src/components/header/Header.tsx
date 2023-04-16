"use client";

import Image from "next/image";
import defaultUserImg from "public/illust/img/img_userDefault.png";

import { LogoLink } from "@/components/common";

import { KenllIcon, ProfileIcon } from "@/assets/icons";

import * as S from "./styled";

// import { useAuth } from "@/context";

function Header() {
  const isAuthed = false;
  // const { isAuthed, initializing } = useAuth();

  return (
    <S.Header>
      <S.Container>
        <LogoLink />
        <S.Box>
          <S.MenuBtn>
            {isAuthed ? (
              <ProfileIcon />
            ) : (
              <Image src={defaultUserImg} alt="마이 페이지" width={24} height={24} priority />
            )}
          </S.MenuBtn>
          <S.MenuBtn>
            <KenllIcon />
          </S.MenuBtn>
        </S.Box>
      </S.Container>
    </S.Header>
  );
}

export default Header;
