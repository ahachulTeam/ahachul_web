import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import * as S from './imageZoomViewer.styled';

interface ImageZoomViewerProps {
  src: string;
  isPanEnabled: boolean;
  onZoomChange: (scale: number) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

const ImageZoomViewer: React.FC<ImageZoomViewerProps> = ({
  src,
  isPanEnabled,
  onZoomChange,
  onInteractionEnd,
  onInteractionStart,
}) => {
  return (
    <TransformWrapper
      panning={{
        disabled: !isPanEnabled,
      }}
      doubleClick={{ mode: 'toggle' }}
      onZoomStop={onInteractionEnd}
      onZoomStart={onInteractionStart}
      onPanningStop={onInteractionEnd}
      onPanningStart={onInteractionStart}
      onPinchingStop={onInteractionEnd}
      onPinchingStart={onInteractionStart}
      onTransformed={ref => onZoomChange(ref.state.scale)}
    >
      <TransformComponent>
        <S.ZoomEnabledImage
          alt=""
          src={src}
          css={{
            height: !isPanEnabled ? 'auto' : '100vh',
            objectFit: !isPanEnabled ? 'cover' : 'contain',
          }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ImageZoomViewer;
