import { useState, type PropsWithChildren } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import { useDisableScroll } from 'shared/lib/hooks/useDisableScroll';
import { useTimeout } from 'shared/lib/hooks/useTimeout';
import animationData from 'shared/static/lottie/loading.json';
import { Background } from 'shared/ui/Background/Background';

import * as S from './Spinner.styled';

interface LoadingProps {
  opacity?: number;
  isWhite?: boolean;
  deferredMs?: number;
}

const LoadingSpinner = ({
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
        css={S.loader}
        src={animationData}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
      />
      {children}
    </Background>
  );
};

export default LoadingSpinner;
