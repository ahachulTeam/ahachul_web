import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import animationData from '@/src/static/lottie/loading.json';
import { SizeWithPercentType, SizeWithPxType } from '@/src/types';

interface PartialLoadingProps {
  className?: string;
  size?: SizeWithPercentType | SizeWithPxType;
}

function PartialLoading({ size = '130px', className }: PartialLoadingProps) {
  return (
    <Player
      loop
      autoplay
      src={animationData}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
      css={{ width: size }}
      className={className}
    />
  );
}

export default PartialLoading;
