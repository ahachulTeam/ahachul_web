import { PropsWithChildren } from 'react';
import * as styles from './Layout.css';

export const ComposeLayout = (props: PropsWithChildren) => {
  return (
    <div data-vaul-drawer-wrapper="true" css={styles.composeLayout}>
      {props.children}
    </div>
  );
};
