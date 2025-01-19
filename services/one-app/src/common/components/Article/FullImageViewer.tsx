'use client';

import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface ImageViewerProps {
  src: string;
  isPanEnabled: boolean;
  onZoomChange: (scale: number) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
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
<<<<<<< HEAD
      onTransformed={ref => onZoomChange(ref.state.scale)}
=======
      onTransformed={(ref) => onZoomChange(ref.state.scale)}
>>>>>>> main
    >
      <TransformComponent>
        <img
          alt=""
          src={src}
          className=" w-[100vw] z-[100]"
          style={{
            height: !isPanEnabled ? 'auto' : '100vh',
            objectFit: !isPanEnabled ? 'cover' : 'contain',
          }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
};
