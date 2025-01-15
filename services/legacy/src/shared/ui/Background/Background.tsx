import { type PropsWithChildren } from 'react';

import * as styles from './Background.css';

interface BackgroundProps {
  opacity: number;
  isWhite: boolean;
}

export const Background = ({
  opacity = 0.45,
  isWhite = false,
  children,
}: PropsWithChildren<Partial<BackgroundProps>>) => {
  return (
    <div css={styles.wrap}>
      <div css={styles.cover(opacity, isWhite)} />
      <div css={styles.background}>{children}</div>
    </div>
  );
};
