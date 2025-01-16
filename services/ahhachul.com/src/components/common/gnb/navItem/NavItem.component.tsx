import type { NavItem as NavItemType } from './NaItem.type';
import { useNavItem } from './NavItem.hook';
import * as S from './NavItem.styled';

interface NavItemProps {
  item: NavItemType;
  handleScrollToTop: VoidFunction;
}

export const NavItem = ({ item, handleScrollToTop }: NavItemProps) => {
  const {
    label,
    //  icon: Icon
  } = item;
  const { isSame, handleTabClick } = useNavItem({ item, handleScrollToTop });

  return (
    <S.NavItemButton isActive={isSame} onClick={handleTabClick}>
      {/* {Icon} */}
      <span>{label}</span>
    </S.NavItemButton>
  );
};
