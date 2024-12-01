import React, { useReducer, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { ResponseOfImage } from 'entities/with-server';
import { FullImageDialog } from './FullImageDialog';
import * as styles from './BaseArticleImages.css';

interface Props {
  label: string;
  images: ResponseOfImage[];
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
        <div css={styles.swipeContainer} onClick={handleFullImageDialog}>
          <LazyLoadImage
            src={images[0].imageUrl}
            alt={`${label}-img-0`}
            css={styles.swipeImg}
            effect="opacity"
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
          css={styles.swipeContainer}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img.imageId} onClick={clickIndex(idx)}>
              <LazyLoadImage
                effect="opacity"
                alt={`${label}-img-${idx + 1}`}
                src={img.imageUrl}
                css={styles.swipeImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
      <FullImageDialog
        isOpen={showFullImgDialog}
        images={images}
        onClose={handleFullImageDialog}
        clickedIndex={clickedIndex}
      />
    </>
  );
};

export default BaseArticleImages;
