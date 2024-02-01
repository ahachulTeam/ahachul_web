import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Text } from "@ahhachul/react-components-layout";

import { isMatchRoute } from "~/utils/helper/navigation";

interface NavItemProps {
  label: string;
  path: string;
  icon: {
    default: React.ReactElement;
    active: React.ReactElement;
  };
}

const NavItem = ({ label, path, icon }: NavItemProps) => {
  const { pathname } = useRouter();

  const isCurrentPage = isMatchRoute(path, pathname);

  return (
    <BottomNavItem>
      <Link href={path} aria-current={isCurrentPage ? "page" : "false"}>
        {isCurrentPage ? icon.active : icon.default}
        <Text
          as="span"
          fontSize="xs"
          style={{ color: isCurrentPage ? "#2EE477" : "#616161" }}
        >
          {label}
        </Text>
      </Link>
    </BottomNavItem>
  );
};

const BottomNavItem = styled.li`
  height: 100%;

  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 8px;
    width: 100%;
    height: 100%;
  }
`;

export default NavItem;
