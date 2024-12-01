import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styled from '@emotion/styled';

interface ImageViewerProps {
  src: string;
  isPanEnabled: boolean;
  onZoomChange: (scale: number) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
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
      onTransformed={(ref) => onZoomChange(ref.state.scale)}
    >
      <TransformComponent>
        <CenterImage
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

const CenterImage = styled.img`
  width: 100vw;
  z-index: 100;
`;

export default ImageViewer;
