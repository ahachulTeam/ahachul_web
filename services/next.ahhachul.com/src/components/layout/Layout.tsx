import React, { useEffect } from 'react';
// import { AppScreen } from '@stackflow/plugin-basic-ui';

// import { UiComponent } from '@/src/components';
// import { TypeActivities } from 'stackflow';
// import { Nullable } from '@/src/types/utility-types';
// import useDefaultAppBar from './useDefaultAppBar';
// import { scrollable, wrapper } from './style';
// import { useAppSelector } from '@/src/stores';
// import { theme } from '@/src/styles';

// type PropOf<T> = T extends React.ComponentType<infer U> ? U : never;

interface LayoutProps {
  // activeTab?: KeyOf<TypeActivities> | false;
  // appBar?: PropOf<typeof AppScreen>['appBar'];
  // children: React.ReactNode;
  hasSearch?: boolean;
  isDate?: boolean;
  // backgroundColor?: CSSProperties['backgroundColor'];
  // onTopClick?: VoidFunction;
}

const Layout: React.FC<LayoutProps> = ({
  // activeTab = 'Home',
  // appBar,
  // hasSearch = false,
  isDate = false,
  // backgroundColor,
  // children,
}) => {
  // const { loading, snackBars } = useAppSelector((state) => state.ui);
  // const { defaultAppBar } = useDefaultAppBar({ activeTab, hasSearch, isDate });

  // const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  // const scrollToTop = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    if (isDate) return;
    const themeColor = document?.getElementById('theme-color');
    if (themeColor) {
      themeColor.setAttribute('content', '#141517');
    }
  }, [isDate]);

  return (
    // <AppScreen
    //   appBar={{
    //     ...(appBar || defaultAppBar),
    //     textColor: theme.color.scale.gray[1000],
    //     iconColor: theme.color.scale.gray[1000],
    //     onTopClick: scrollToTop,
    //   }}
    //   backgroundColor={backgroundColor ?? theme.color.static.dark.gray[200]}
    //   preventSwipeBack
    // >
    //   <div css={wrapper}>
    //     <div ref={topEl} css={scrollable(Boolean(activeTab))}>
    //       {children}
    //     </div>
    //   </div>
    //   <UiComponent.SnackBar {...snackBars} />
    //   {activeTab && <UiComponent.NavBar activeTab={activeTab} scrollToTop={scrollToTop} />}
    //   {activeTab && <UiComponent.BottomDim />}
    //   {loading.active && <UiComponent.Loading opacity={loading.opacity} />}
    // </AppScreen>
    <></>
  );
};

export default Layout;
