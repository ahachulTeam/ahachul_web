'use client';

<<<<<<< HEAD
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { PostImage } from '@/model';

=======
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import type { PostImage } from '@/model';

import 'swiper/css';
import 'swiper/css/pagination';

>>>>>>> main
interface Props {
  label: string;
  images: PostImage[];
  canShowFullImageDialog?: boolean;
}

export const BaseArticleImages = ({
<<<<<<< HEAD
  // label,
=======
  label,
>>>>>>> main
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

  return (
    <>
      {images.length === 1 ? (
        <div
          className=" relative w-full aspect-square"
          // onClick={handleFullImageDialog}
        >
<<<<<<< HEAD
          {/* TODO */}
          {/* <LazyLoadImage
=======
          <LazyLoadImage
>>>>>>> main
            src={images[0].imageUrl}
            alt={`${label}-img-0`}
            effect="opacity"
            className=" absolute object-cover top-0 left-0 w-full h-full"
<<<<<<< HEAD
          /> */}
=======
          />
>>>>>>> main
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
<<<<<<< HEAD
          {images.map(img => (
=======
          {images.map((img, idx) => (
>>>>>>> main
            <SwiperSlide
              key={img.imageId}
              // onClick={clickIndex(idx)}
            >
<<<<<<< HEAD
              {/* TODO */}
              {/* <LazyLoadImage
=======
              <LazyLoadImage
>>>>>>> main
                effect="opacity"
                alt={`${label}-img-${idx + 1}`}
                src={img.imageUrl}
                className=" absolute object-cover top-0 left-0 w-full h-full"
<<<<<<< HEAD
              /> */}
=======
              />
>>>>>>> main
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
