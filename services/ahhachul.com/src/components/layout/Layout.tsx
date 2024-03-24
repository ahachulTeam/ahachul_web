import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { UiComponent } from 'components';
import { TypeActivities } from 'stackflow';
import { KeyOf, Nullable } from 'types/utility-types';
import withDefaultAppBar from './withDefaultAppBar';
import { scrollable, wrapper } from './style';
import { useAppSelector } from 'stores';
import { theme } from 'styles';

type PropOf<T> = T extends React.ComponentType<infer U> ? U : never;

interface LayoutProps {
  activeTab?: KeyOf<TypeActivities> | false;
  appBar?: PropOf<typeof AppScreen>['appBar'];
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab = 'Home', appBar, children }) => {
  const { loading, snackBars } = useAppSelector((state) => state.ui);
  const { replace, defaultAppBar } = withDefaultAppBar();
  const navigate = React.useCallback((tab: KeyOf<TypeActivities>) => replace(tab, {}, { animate: false }), [replace]);

  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const scrollToTop = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const showSnackBar = !!snackBars.list.length;

  return (
    <AppScreen
      appBar={{
        ...(appBar || defaultAppBar),
        textColor: theme.color.scale.gray[1000],
        iconColor: theme.color.scale.gray[1000],
        onTopClick: scrollToTop,
      }}
      backgroundColor={theme.color.static.dark.gray[200]}
    >
      <div css={wrapper}>
        <div ref={topEl} css={scrollable(Boolean(activeTab))}>
          {children}
        </div>
      </div>
      {loading && <UiComponent.Loading opacity={1} />}
      {showSnackBar && <UiComponent.SnackBar {...snackBars} />}
      {activeTab && <UiComponent.NavBar activeTab={activeTab} replace={navigate} scrollToTop={scrollToTop} />}
      {activeTab && <UiComponent.BottomDim />}
    </AppScreen>
  );
};

export default Layout;
