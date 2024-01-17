// import { useScrollDirection } from "@ahhachul/lib";
// import { css } from "@emotion/react";
// import styled from "@emotion/styled";
// import { useRouter } from "next/router";

// import NavItem from "./NavItem";
// import { NAV_MENUS } from "@/assets/static";
// import { hiddenNavbarPaths } from "@/constants/navbar";

// const Navbar = () => {
//   const { pathname } = useRouter();
//   const { isScrollUp } = useScrollDirection();

//   return (
//     <BottomNavbar
//       id="navigation-bar"
//       data-show={!hiddenNavbarPaths.includes(pathname) && isScrollUp}
//     >
//       <MenuList>
//         {NAV_MENUS.map(({ label, path, SvgIcon }) => (
//           <NavItem key={label} label={label} path={path} icon={<SvgIcon />} />
//         ))}
//       </MenuList>
//     </BottomNavbar>
//   );
// };

// const BottomNavbar = styled.nav`
//   ${({ theme }) => css`
//     position: fixed;
//     bottom: 0;
//     left: 50%;
//     max-width: ${theme.size.layout.width};
//     width: 100%;
//     height: ${theme.size.bottomNavbar.height};
//     border-top: 1px solid ${theme.colors.gray_30};
//     background-color: ${theme.colors.white};
//     transform: translate(-50%, 100%);
//     transition: transform 400ms cubic-bezier(0.43, 0.03, 0.15, 0.95);
//     overflow: hidden;
//     z-index: ${theme.zIndex.sticky};

//     &[data-show="true"] {
//       transform: translate(-50%, 0);
//     }
//   `}
// `;

// const MenuList = styled.ul`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 100%;
// `;

// export default Navbar;

export {};
