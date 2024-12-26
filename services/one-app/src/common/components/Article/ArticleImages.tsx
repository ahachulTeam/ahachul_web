import React, { useReducer, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { PostImage } from '@/model/PostImage';

import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  label: string;
  images: PostImage[];
  canShowFullImageDialog?: boolean;
}

const BaseArticleImages = ({
  label,
  images,
  canShowFullImageDialog = true,
}: Props) => {
  const [showFullImgDialog, toggletShowFullImgDialog] = useReducer(
    (open) => !open,
    false,
  );

  const handleFullImageDialog = () => {
    if (!canShowFullImageDialog) return;
    else toggletShowFullImgDialog();
  };

  const [clickedIndex, setClickedIndex] = useState(0);
  const clickIndex = (idx: number) => () => {
    setClickedIndex(idx);
    handleFullImageDialog();
  };

  return (
    <>
      {images.length === 1 ? (
        <div
          className=" relative w-full aspect-square"
          onClick={handleFullImageDialog}
        >
          <LazyLoadImage
            src={images[0].imageUrl}
            alt={`${label}-img-0`}
            effect="opacity"
            className=" absolute object-cover top-0 left-0 w-full h-full"
          />
        </div>
      ) : images.length > 1 ? (
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          simulateTouch={false}
          touchStartPreventDefault={false}
          touchMoveStopPropagation={false}
          pagination={{ clickable: true }}
          className=" relative w-full aspect-square"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img.imageId} onClick={clickIndex(idx)}>
              <LazyLoadImage
                effect="opacity"
                alt={`${label}-img-${idx + 1}`}
                src={img.imageUrl}
                className=" absolute object-cover top-0 left-0 w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
      {/* <FullImageDialog
        isOpen={showFullImgDialog}
        images={images}
        onClose={handleFullImageDialog}
        clickedIndex={clickedIndex}
      /> */}
    </>
  );
};

export default BaseArticleImages;
