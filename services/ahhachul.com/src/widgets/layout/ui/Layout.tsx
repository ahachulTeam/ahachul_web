import React, { type ComponentProps } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Navbar } from 'widgets/navigation';
import { FilterGroup } from 'widgets/filters/ui/FilterGroup';
import themes from 'shared/themes.css';
import * as styles from './Layout.css';

export const Layout = (
  props: ComponentProps<typeof AppScreen> & {
    filterSlot?: typeof FilterGroup;
    navigationSlot?: typeof Navbar;
  },
) => {
  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const onTopClick = () =>
    topEl?.current?.scrollTo?.({ top: 0, behavior: 'smooth' });
  const _appBar = Object.assign(props.appBar ?? {}, {
    iconColor: themes.color.text[50],
    textColor: themes.color.text[50],
    onTopClick,
  });
  const hasFilter = Boolean(props.filterSlot);

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
      {props.filterSlot?.({ show: hasFilter })}
      {props.navigationSlot?.({ onTopClick })}
    </AppScreen>
  );
};
