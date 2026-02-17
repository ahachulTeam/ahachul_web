import { type ReactNode, useReducer, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { type SwiperRef, Swiper, SwiperSlide } from 'swiper/react';

import { UiComponent } from '@/components';
import type { PostImage } from '@/types';

import * as S from './ImageCarousel.styled';

interface ImageCarouselProps {
  label: string;
  images: PostImage[];
}

const ImageCarousel = ({ label, images }: ImageCarouselProps) => {
  const [showCarouselMdal, toggleModal] = useReducer(open => !open, false);

  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIdx] = useState(0);
  const handleActiveIdx = (idx: number) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(idx);
    }
    setActiveIdx(idx);
  };

  const handleClickSlide = (idx: number) => () => {
    setActiveIdx(idx);
    toggleModal();
  };

  let carouselContent: ReactNode = null;
  if (images.length === 1) {
    carouselContent = (
      <div css={S.swipeContainerCss} onClick={toggleModal}>
        <LazyLoadImage
          src={images[0].imageUrl}
          alt={`${label}-img-0`}
          css={S.swipeImageCss}
          effect="opacity"
        />
      </div>
    );
  } else if (images.length > 1) {
    carouselContent = (
      <Swiper
        ref={swiperRef}
        modules={[Pagination]}
        slidesPerView={1}
        simulateTouch={false}
        touchStartPreventDefault={false}
        touchMoveStopPropagation={false}
        pagination={{ clickable: true }}
        css={S.swipeContainerCss}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img.imageId} onClick={handleClickSlide(idx)}>
            <LazyLoadImage
              effect="opacity"
              alt={`${label}-img-${idx + 1}`}
              src={img.imageUrl}
              css={S.swipeImageCss}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <>
      {carouselContent}

      {showCarouselMdal && (
        <UiComponent.ImageCarouselModal
          images={images}
          activeIndex={activeIndex}
          handleActiveIdx={handleActiveIdx}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

export default ImageCarousel;
