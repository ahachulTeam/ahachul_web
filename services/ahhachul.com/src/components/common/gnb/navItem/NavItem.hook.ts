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

  const isActive = activity.name === item.href;

  const { replace } = useFlow();

  const handleHapticFeedback = useCallback(() => {}, []);

  const handleTabClick = () => {
    if (isActive) {
      handleScrollToTop?.();
      return;
    }

    handleHapticFeedback();

    replace(item.href, {}, { animate: false });
  };

  return {
    isActive,
    handleTabClick,
  };
};
