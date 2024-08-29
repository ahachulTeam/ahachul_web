import React, { PropsWithChildren } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import { Background } from 'shared/ui/Background/Background';
import animationData from 'shared/static/lottie/loading.json';
// import animationData from 'shared/static/lottie/loading.json' assert { type: 'json' };
import * as styles from './Loading.css';

interface LoadingProps {
  opacity: number;
  isWhite: boolean;
}

export const Loading = ({
  opacity = 0.4,
  isWhite = false,
  children,
}: PropsWithChildren<Partial<LoadingProps>>) => {
  useDisableScroll();

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
