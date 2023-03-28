"use client";

import { NAV_MENUS } from "@/assets/static";

import * as S from "./Navbar.styled";
import NavItem from "./item/NavItem";

export default function Navbar() {
  return (
    <S.Navbar>
      <S.MenuList>
        {NAV_MENUS.map(({ label, path, SvgIcon }) => (
          <NavItem key={label} label={label} path={path} icon={<SvgIcon />} />
        ))}
      </S.MenuList>
    </S.Navbar>
  );
}