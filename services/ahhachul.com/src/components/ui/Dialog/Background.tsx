import React, { PropsWithChildren } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import { background, wrap, backgroundCover } from './style';

interface Props {
  css?: Interpolation<Theme>;
  opacity?: number;
  isWhite?: boolean;
}

function Background({ css = {}, opacity = 0, isWhite = false, children }: PropsWithChildren<Props>) {
  return (
    <div css={wrap}>
      <div css={backgroundCover(opacity, isWhite)} />
      <div css={[background, css]}>{children}</div>
    </div>
  );
}

export default Background;
