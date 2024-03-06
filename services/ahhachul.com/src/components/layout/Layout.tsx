import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { UiComponent } from 'components';
import { TypeActivities } from 'stackflow';
import { KeyOf, Nullable } from 'types/utility-types';
import withDefaultAppBar from './withDefaultAppBar';
import { scrollable, wrapper } from './style';

type PropOf<T> = T extends React.ComponentType<infer U> ? U : never;

interface LayoutProps {
  activeTab?: KeyOf<TypeActivities> | false;
  appBar?: PropOf<typeof AppScreen>['appBar'];
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab = 'Home', appBar, children }) => {
  const { replace, defaultAppBar } = withDefaultAppBar();
  const navigate = React.useCallback((tab: KeyOf<TypeActivities>) => replace(tab, {}, { animate: false }), []);

  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const scrollToTop = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AppScreen appBar={appBar || defaultAppBar}>
      <div css={wrapper}>
        <div ref={topEl} css={scrollable(Boolean(activeTab))}>
          {children}
        </div>
      </div>
      {activeTab && <UiComponent.NavBar activeTab={activeTab} replace={navigate} scrollToTop={scrollToTop} />}
    </AppScreen>
  );
};

export default Layout;
