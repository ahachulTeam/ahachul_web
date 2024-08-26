import React, { PropsWithChildren } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { Player } from '@lottiefiles/react-lottie-player';

import animationData from 'shared/static/lottie/loading.json';
import useDisableScroll from 'shared/lib/hooks/useDisableScroll';
import Background from './Background';
import { loader } from './style';

interface Props {
  css?: Interpolation<Theme>;
  opacity?: number;
  isWhite?: boolean;
}

function Loading({ css = {}, opacity = 0.45, isWhite = false, children }: PropsWithChildren<Props>) {
  useDisableScroll();

  return (
    <Background css={css} opacity={opacity} isWhite={isWhite}>
      <Player
        autoplay
        loop
        src={animationData}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
        css={loader}
      />
      {children}
    </Background>
  );
}

export default Loading;
