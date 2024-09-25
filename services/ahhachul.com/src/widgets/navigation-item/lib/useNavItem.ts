import { useActivity, useFlow } from 'app/stackflow';
import { NavItem } from 'widgets/navigation-item/model';

export const useNavItem = ({
  tab,
  handleScrollToTop,
}: {
  tab: NavItem;
  handleScrollToTop?: VoidFunction;
}) => {
  const activity = useActivity();
  const isSame = activity.name === tab.href;

  const { replace } = useFlow();
  const handleTabClick = () => {
    if (isSame) {
      handleScrollToTop?.();
      return false;
    }

    replace(tab.href, {}, { animate: false });
  };

  return {
    isSame,
    handleTabClick,
  };
};
