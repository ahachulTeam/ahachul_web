import { useCallback } from 'react';

import { useActivity, useFlow } from 'app/stackflow';
import { nativeMethodUtils } from 'entities/app-bridge/data/native-methods';
// import { isWebView } from 'shared/lib/config/app-env';
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
  const handleHapticFeedback = useCallback(() => {
    // if (isWebView()) {
    nativeMethodUtils.haptic();
    // }
  }, []);
  const handleTabClick = () => {
    if (isSame) {
      handleScrollToTop?.();
      return false;
    }

    handleHapticFeedback();
    replace(tab.href, {}, { animate: false });
  };

  return {
    isSame,
    handleTabClick,
  };
};
