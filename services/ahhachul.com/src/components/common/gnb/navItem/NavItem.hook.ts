import { useCallback } from 'react';

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
  const isSame = activity.name === item.href;

  const { replace } = useFlow();
  const handleHapticFeedback = useCallback(() => {
    // if (isWebView()) {
    // nativeMethodUtils.haptic();
    // }
  }, []);
  const handleTabClick = () => {
    if (isSame) {
      handleScrollToTop?.();
      return false;
    }

    handleHapticFeedback();
    replace(item.href, {}, { animate: false });
  };

  return {
    isSame,
    handleTabClick,
  };
};
