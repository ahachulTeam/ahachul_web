import React, {
  type ComponentProps,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Navbar } from 'widgets/navigation';
import themes from 'shared/themes.css';
import * as styles from './Layout.css';

interface LayoutProps extends ComponentProps<typeof AppScreen> {
  showNavbar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  showNavbar,
  appBar,
  children,
  backgroundColor = themes.color.background[50],
  ...props
}) => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = useCallback(() => {
    scrollableRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const customAppBar = useMemo(
    () => ({
      ...appBar,
      iconColor: themes.color.text[50],
      textColor: themes.color.text[50],
    }),
    [appBar],
  );

  const navbarConfig = useMemo(
    () => ({
      elementRef: scrollableRef,
      handleScrollToTop,
    }),
    [handleScrollToTop],
  );

  return (
    <AppScreen
      appBar={customAppBar}
      backgroundColor={backgroundColor}
      {...props}
    >
      <main css={styles.wrapper}>
        <div ref={scrollableRef} css={styles.scrollable(Boolean(showNavbar))}>
          {children}
        </div>
      </main>
      {showNavbar && <Navbar {...navbarConfig} />}
    </AppScreen>
  );
};
