'use client';

import type { ReactNode } from 'react';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { IPostImage } from '@/types';

interface Props {
  label: string;
  images: IPostImage[];
  canShowFullImageDialog?: boolean;
}

export const BaseArticleImages = ({
  // label,
  images,
  // canShowFullImageDialog = true,
}: Props) => {
  // const [_, toggletShowFullImgDialog] = useReducer((open) => !open, false);

  // const handleFullImageDialog = () => {
  //   if (!canShowFullImageDialog) return;
  //   else toggletShowFullImgDialog();
  // };

  // const [__, setClickedIndex] = useState(0);
  // const clickIndex = (idx: number) => () => {
  //   setClickedIndex(idx);
  //   handleFullImageDialog();
  // };

  let content: ReactNode = null;
  if (images?.length === 1) {
    content = (
      <div
        className=" relative w-full aspect-square"
        // onClick={handleFullImageDialog}
      >
        {/* TODO */}
        {/* <LazyLoadImage
          src={images[0].imageUrl}
          alt={`${label}-img-0`}
          effect="opacity"
          className=" absolute object-cover top-0 left-0 w-full h-full"
        /> */}
      </div>
    );
  } else if (images && images.length > 1) {
    content = (
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        simulateTouch={false}
        touchStartPreventDefault={false}
        touchMoveStopPropagation={false}
        pagination={{ clickable: true }}
        className=" relative w-full aspect-square"
      >
        {images.map(img => (
          <SwiperSlide
            key={img.imageId}
            // onClick={clickIndex(idx)}
          >
            {/* TODO */}
            {/* <LazyLoadImage
              effect="opacity"
              alt={`${label}-img-${idx + 1}`}
              src={img.imageUrl}
              className=" absolute object-cover top-0 left-0 w-full h-full"
            /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <>
      {content}
      {/* <FullImageDialog
        isOpen={showFullImgDialog}
        images={images}
        onClose={handleFullImageDialog}
        clickedIndex={clickedIndex}
      /> */}
    </>
  );
};
