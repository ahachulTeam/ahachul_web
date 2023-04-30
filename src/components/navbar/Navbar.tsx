import { usePathname } from "next/navigation";

import { useScrollDirection } from "@/hooks";

import { NAV_MENUS } from "@/assets/static";

import * as S from "./Navbar.styled";
import NavItem from "./item/NavItem";

export default function Navbar() {
  const pathname = usePathname();
  const direction = useScrollDirection();

  return (
    <S.Navbar data-show={pathname !== "/onboarding" && direction === "up"}>
      <S.MenuList>
        {NAV_MENUS.map(({ label, path, SvgIcon }) => (
          <NavItem key={label} label={label} path={path} icon={<SvgIcon />} />
        ))}
      </S.MenuList>
    </S.Navbar>
  );
}
