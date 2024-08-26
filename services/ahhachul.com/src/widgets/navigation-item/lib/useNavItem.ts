import { useActivity, useFlow } from 'app/stackflow';
import { NavItem } from 'widgets/navigation-item/model';

export const useNavItem = ({ tab, callbackFn_whenIsSame }: { tab: NavItem; callbackFn_whenIsSame?: VoidFunction }) => {
  const activity = useActivity();
  const isSame = activity.name === tab.href;

  const { replace } = useFlow();
  const handleTabClick = () => {
    if (isSame) {
      callbackFn_whenIsSame?.();
      return false;
    }

    // @ts-ignore
    replace(tab.href, {}, { animate: false });
  };

  return {
    isSame,
    handleTabClick,
  };
};
