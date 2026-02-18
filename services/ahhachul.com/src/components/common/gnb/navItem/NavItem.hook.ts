import { useAuth, useNativeBridge } from '@/contexts';
import { useFlow, useActivity } from '@/stackflow';

import type { NavItem } from './NavItem.type';

export const useNavItem = ({
  item,
  handleScrollToTop,
}: {
  item: NavItem;
  handleScrollToTop?: VoidFunction;
}) => {
  const activity = useActivity();
  const isActive = item.href.includes(activity.name as NavItem['href'][0]);

  const { push, replace } = useFlow();
  const { bridge, isBridgeInitialized } = useNativeBridge();

  const {
    authService: { isAuthenticated },
  } = useAuth();

  const handleTabClick = () => {
    if (isActive) {
      handleScrollToTop?.();
      return;
    }

    if (isBridgeInitialized) {
      bridge.send.haptic();
    }

    if (item.href[0] === 'MyPage' && !isAuthenticated) {
      push('SignInPage', {});
      return;
    }

    replace(item.href[0], {}, { animate: false });
  };

  return {
    isActive,
    handleTabClick,
  };
};
