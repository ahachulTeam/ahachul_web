import React, { CSSProperties, PropsWithChildren, useEffect } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { UiComponent } from 'components';
import { TypeActivities } from 'stackflow';
import { KeyOf, Nullable } from 'types/utility-types';
import useDefaultAppBar from './useDefaultAppBar';
import { scrollable, wrapper } from './style';
import { useAppSelector } from 'stores';
import { theme } from 'shared/style';

type PropOf<T> = T extends React.ComponentType<infer U> ? U : never;

interface LayoutProps {
  activeTab?: KeyOf<TypeActivities> | false;
  hasSearch?: boolean;
  isDate?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  appBar?: PropOf<typeof AppScreen>['appBar'];
  onTopClick?: VoidFunction;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  activeTab = 'Home',
  hasSearch = false,
  isDate = false,
  backgroundColor,
  appBar,
  children,
}) => {
  const { loading, snackBars } = useAppSelector((state) => state.ui);
  const { defaultAppBar } = useDefaultAppBar({ activeTab, hasSearch, isDate });

  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const scrollToTop = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    if (isDate) return;
    const themeColor = document?.getElementById('theme-color');
    if (themeColor) {
      themeColor.setAttribute('content', '#141517');
    }
  }, [isDate]);

  return (
    <AppScreen
      appBar={{
        ...(appBar || defaultAppBar),
        textColor: theme.color.text[50],
        iconColor: theme.color.text[50],
        onTopClick: scrollToTop,
      }}
      backgroundColor={backgroundColor ?? theme.color.background[50]}
      preventSwipeBack
    >
      <div css={wrapper}>
        <div ref={topEl} css={scrollable(Boolean(activeTab))}>
          {children}
        </div>
      </div>
      <UiComponent.SnackBar {...snackBars} />
      {activeTab && <UiComponent.NavBar activeTab={activeTab} scrollToTop={scrollToTop} />}
      {loading.active && <UiComponent.Loading opacity={loading.opacity} />}
    </AppScreen>
  );
};

export default Layout;
