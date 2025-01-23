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
  const isActive = activity.name === item.href;

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

    replace(item.href, {}, { animate: false });
  };

  return {
    isActive,
    handleTabClick,
  };
};
