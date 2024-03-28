import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { Player } from '@lottiefiles/react-lottie-player';

import animationData from 'static/lottie/loading.json';
import { SizeWithPercentType, SizeWithPxType } from 'types';

interface PartialLoadingProps {
  css?: Interpolation<Theme>;
  size?: SizeWithPercentType | SizeWithPxType;
}

function PartialLoading({ css = {}, size = '130px' }: PartialLoadingProps) {
  return (
    <Player
      autoplay
      loop
      src={animationData}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
      css={[css, { width: size }]}
    />
  );
}

export default PartialLoading;
