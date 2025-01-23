import { useState, type PropsWithChildren } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import animationData from '@/assets/lottie/loading.json';
import { useDisableScroll } from '@/hooks';
import { useTimeout } from '@/hooks';

import * as S from './Spinner.styled';

import { Dim } from '../dim';

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
    <Dim opacity={opacity} isWhite={isWhite}>
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
    </Dim>
  );
};

export default LoadingSpinner;
