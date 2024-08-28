import React, { type ComponentProps } from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import themes from 'shared/themes.css';

export const Layout = (
  props: ComponentProps<typeof AppScreen> & {
    navigationSlot?: React.ReactNode;
    dimSlot?: React.ReactNode;
  },
) => {
  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const onTopClick = () =>
    topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });
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
      <main ref={topEl}>{props.children}</main>
      {props.navigationSlot}
      {props.dimSlot}
    </AppScreen>
  );
};
