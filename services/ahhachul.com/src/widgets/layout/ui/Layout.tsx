import React, { type ComponentProps, forwardRef } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Navbar } from 'widgets/navigation';
import { ScrollCondition } from 'shared/lib/hooks/useScrollTracker';
import themes from 'shared/themes.css';
import * as styles from './Layout.css';

type LayoutProps = ComponentProps<typeof AppScreen> & {
  condition?: ScrollCondition;
  navigationSlot?: typeof Navbar;
};

export const Layout = forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const topEl = ref as React.RefObject<HTMLDivElement>;

  const onTopClick = () =>
    topEl?.current?.scrollTo?.({ top: 0, behavior: 'smooth' });

  const _appBar = Object.assign(props.appBar ?? {}, {
    iconColor: themes.color.text[50],
    textColor: themes.color.text[50],
    onTopClick,
  });

  return (
    <AppScreen
      appBar={_appBar}
      preventSwipeBack
      backgroundColor={props.backgroundColor ?? themes.color.background[50]}
    >
      <main css={styles.wrapper}>
        <div ref={topEl} css={styles.scrollable(Boolean(props.navigationSlot))}>
          {props.children}
        </div>
      </main>
      {props.navigationSlot?.({
        condition: props.condition,
        onTopClick,
      })}
    </AppScreen>
  );
});

Layout.displayName = 'Layout';
