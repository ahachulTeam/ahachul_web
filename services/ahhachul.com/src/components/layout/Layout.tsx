import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

import { UiComponent } from 'components';
import { TypeActivities } from 'stackflow';
import { KeyOf, Nullable } from 'types/utility-types';
import useDefaultAppBar from './useDefaultAppBar';
import { scrollable, wrapper } from './style';
import { useAppSelector } from 'stores';
import { theme } from 'styles';

type PropOf<T> = T extends React.ComponentType<infer U> ? U : never;

interface LayoutProps {
  activeTab?: KeyOf<TypeActivities> | false;
  appBar?: PropOf<typeof AppScreen>['appBar'];
  children: React.ReactNode;
  hasSearch?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ activeTab = 'Home', appBar, hasSearch = false, children }) => {
  const { loading, snackBars } = useAppSelector((state) => state.ui);
  const { defaultAppBar } = useDefaultAppBar(hasSearch);

  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const scrollToTop = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });

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
      <UiComponent.SnackBar {...snackBars} />
      {loading && <UiComponent.Loading opacity={0.45} />}
      {activeTab && <UiComponent.NavBar activeTab={activeTab} scrollToTop={scrollToTop} />}
      {activeTab && <UiComponent.BottomDim />}
    </AppScreen>
  );
};

export default Layout;
