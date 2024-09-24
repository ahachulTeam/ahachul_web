import React, {
  type ComponentProps,
  useRef,
  useEffect,
  useState,
  forwardRef,
} from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Navbar } from 'widgets/navigation';
import themes from 'shared/themes.css';
import * as styles from './Layout.css';

type LayoutProps = ComponentProps<typeof AppScreen> & {
  navigationSlot?: typeof Navbar;
};

export const Layout = forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const topEl = (ref as React.RefObject<HTMLDivElement>) ?? innerRef;
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log('scrollPosition', scrollPosition);

  const onTopClick = () =>
    topEl?.current?.scrollTo?.({ top: 0, behavior: 'smooth' });

  const handleScroll = () => {
    const position = topEl.current?.scrollTop ?? 0;
    setScrollPosition(position);
    console.log('Current scroll position:', position);
  };

  useEffect(() => {
    const element = topEl.current;
    if (element) {
      element.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
      {props.navigationSlot?.({ onTopClick })}
    </AppScreen>
  );
});

Layout.displayName = 'Layout';
