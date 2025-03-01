import { useNativeBridge } from '@/contexts';
import { useFlow, useActivity } from '@/stackflow';

import type { NavItem } from './NaItem.type';

export const useNavItem = ({
  item,
  handleScrollToTop,
}: {
  item: NavItem;
  handleScrollToTop?: VoidFunction;
}) => {
  const activity = useActivity();
  const isActive = item.href.includes(activity.name as NavItem['href'][0]);

  const { replace } = useFlow();
  const { bridge, isBridgeInitialized } = useNativeBridge();

  const handleTabClick = () => {
    if (isActive) {
      handleScrollToTop?.();
      return;
    }

    if (isBridgeInitialized) {
      bridge.send.haptic();
    }

    replace(item.href[0], {}, { animate: false });
  };

  return {
    isActive,
    handleTabClick,
  };
};
