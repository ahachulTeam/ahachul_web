import type { NavItem as NavItemType } from './NaItem.type';
import { useNavItem } from './NavItem.hook';
import * as S from './NavItem.styled';

interface NavItemProps {
  item: NavItemType;
  handleScrollToTop: VoidFunction;
}

const NavItem = ({ item, handleScrollToTop }: NavItemProps) => {
  const { label, icon: Icon, activeIcon: ActivatedIcon } = item;
  const { isActive, handleTabClick } = useNavItem({ item, handleScrollToTop });

  return (
    <S.NavItemButton isActive={isActive} onClick={handleTabClick}>
      {isActive ? ActivatedIcon : Icon}
      <span>{label}</span>
    </S.NavItemButton>
  );
};

export default NavItem;
