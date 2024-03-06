import styled from "@emotion/styled";

import NavItem from "./NavItem";
import { PATH, NAV_MENUS } from "~/constants/path";
import { KeyOf } from "~/models/common";
import { vars } from "@ahhachul/themes";

const Navbar = () => {
  return (
    <BottomNavbar id="navigation-bar">
      <MenuList>
        {Object.entries(NAV_MENUS).map(([key, value]) => (
          <NavItem
            key={key}
            label={value.label}
            path={PATH[key as KeyOf<typeof PATH>]}
            icon={value.icon}
          />
        ))}
      </MenuList>
    </BottomNavbar>
  );
};

const BottomNavbar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 34px;
  border-top: 1px solid #dde1e5;
  background-color: ${vars.colors.$static.dark.color.white};
  z-index: ${vars.zIndex.zIndexes.nav};
  border-radius: 28px 28px 0 0;
  overflow: hidden;
`;

const MenuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 64px;
  overflow: hidden;
`;

export default Navbar;
