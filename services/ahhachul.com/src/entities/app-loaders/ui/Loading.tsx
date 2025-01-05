import React, { useState, type PropsWithChildren } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import { useTimeout } from 'shared/lib/hooks/useTimeout';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import { Background } from 'shared/ui/Background/Background';
import animationData from 'shared/static/lottie/loading.json';
import * as styles from './Loading.css';

interface LoadingProps {
  opacity?: number;
  isWhite?: boolean;
  deferredMs?: number;
}

export const Loading = ({
  opacity = 0.4,
  isWhite = false,
  deferredMs = 0,
  children,
}: PropsWithChildren<Partial<LoadingProps>>) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useDisableScroll();
  useTimeout(() => setIsDeferred(true), deferredMs);

  if (!isDeferred) return null;
  return (
    <Background opacity={opacity} isWhite={isWhite}>
      <Player
        loop
        autoplay
        css={styles.loader}
        src={animationData}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      />
      {children}
    </Background>
  );
};
