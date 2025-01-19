import React, { useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CloseIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import type { PostImage } from '@/types';

import * as S from './ImageCarouselModal.styled';

interface Props {
  images: PostImage[];
  activeIndex: number;
  handleActiveIdx: (idx: number) => void;
  onClose: () => void;
}

const ImageCarouselModal: React.FC<Props> = ({
  images,
  activeIndex = 0,
  handleActiveIdx,
  onClose,
}) => {
  const [headerShown, setHeaderShown] = useState(true);
  const [isPanEnabled, setIsPanEnabled] = useState(false);

  const handleZoomChange = useCallback((scale: number) => setIsPanEnabled(scale > 1), []);
  const handleInteractionEnd = useCallback(() => setHeaderShown(true), []);
  const handleInteractionStart = useCallback(() => setHeaderShown(false), []);

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
  });

  return (
    <UiComponent.Modal mounted>
      <S.Wrap {...swipeHandlers}>
        <S.Header headerShown={headerShown} isPanEnabled={isPanEnabled}>
          <CloseIcon onClick={onClose} />
          <S.Title>
            {activeIndex + 1}/{images.length}
          </S.Title>
        </S.Header>
        <S.Body isPanEnabled={isPanEnabled}>
          {images.length === 1 ? (
            <UiComponent.ImageZoomViewer
              src={images[0].imageUrl}
              isPanEnabled={isPanEnabled}
              onZoomChange={handleZoomChange}
              onInteractionStart={handleInteractionStart}
              onInteractionEnd={handleInteractionEnd}
            />
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              initialSlide={activeIndex}
              onSlideChange={swiper => handleActiveIdx(swiper.activeIndex)}
              css={S.swiperCss}
            >
              {images.map(img => (
                <SwiperSlide key={img.imageId} className="slide">
                  <UiComponent.ImageZoomViewer
                    src={img.imageUrl}
                    isPanEnabled={isPanEnabled}
                    onZoomChange={handleZoomChange}
                    onInteractionStart={handleInteractionStart}
                    onInteractionEnd={handleInteractionEnd}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </S.Body>
      </S.Wrap>
    </UiComponent.Modal>
  );
};

export default ImageCarouselModal;
