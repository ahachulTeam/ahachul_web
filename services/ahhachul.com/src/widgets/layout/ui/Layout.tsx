import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

export const Layout = (
  props: PropOf<typeof AppScreen> & {
    navigationSlot?: React.ReactNode;
    dimSlot?: React.ReactNode;
  },
) => {
  const topEl = React.useRef<Nullable<HTMLDivElement>>(null);
  const onTopClick = () => topEl?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  const _appBar = Object.assign(props.appBar ?? {}, { onTopClick });

  return (
    <AppScreen appBar={_appBar} preventSwipeBack={props.preventSwipeBack ?? true}>
      <main ref={topEl}>{props.children}</main>
      {props.navigationSlot}
      {props.dimSlot}
    </AppScreen>
  );
};
