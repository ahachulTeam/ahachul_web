import { BottomNavItem } from '@ahhachul/ui';

import type { NavItem as NavItemType } from './NaItem.type';
import { useNavItem } from './NavItem.hook';

interface NavItemProps {
  item: NavItemType;
  handleScrollToTop: VoidFunction;
}

const NavItem = ({ item, handleScrollToTop }: NavItemProps) => {
  const { label, icon: Icon, activeIcon: ActivatedIcon } = item;
  const { isActive, handleTabClick } = useNavItem({ item, handleScrollToTop });

  return (
    <BottomNavItem
      label={label}
      isActive={isActive}
      icon={Icon}
      activeIcon={ActivatedIcon}
      onClick={handleTabClick}
    />
  );
};

export default NavItem;
