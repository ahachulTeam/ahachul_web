import { useActivity, useFlow } from 'app/stackflow';
import { NavItem } from 'widgets/navigation-item/model';

export const useNavItem = ({ tab, scrollToTop }: { tab: NavItem; scrollToTop: VoidFunction }) => {
  const activity = useActivity();
  const isSame = activity.name === tab.href;

  const { replace } = useFlow();
  const handleTabClick = () => {
    if (isSame) scrollToTop();

    // @ts-ignore
    replace(tab.href, {}, { animate: false });
  };

  return {
    isSame,
    handleTabClick,
  };
};
