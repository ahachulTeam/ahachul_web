"use client";

import Image from "next/image";
import { Navigation, Pagination, EffectFade, Mousewheel, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import * as S from "./styled";

type OnboardingCarouselType = {
  id: string;
  title: React.ReactNode;
  overview: string;
  backdropPath: string;
};

interface CarouselProps {
  data: OnboardingCarouselType[];
  fade: boolean;
}

export default function Carousel({ data, fade = false }: CarouselProps) {
  return (
    <S.CarouselLayout data-fade={!!fade}>
      <Swiper
        spaceBetween={fade ? "false" : 10}
        slidesPerView={fade ? 1 : 3}
        slidesPerGroup={fade ? 1 : 3}
        loop={fade || false}
        navigation
        pagination={{
          clickable: true,
        }}
        effect={fade ? "fade" : "slide"}
        fadeEffect={fade ? { crossFade: true } : {}}
        autoplay={
          fade
            ? {
                delay: 4000,
                disableOnInteraction: false,
              }
            : false
        }
        modules={[Navigation, Pagination, EffectFade, Mousewheel, Autoplay]}
      >
        {data.map((result: OnboardingCarouselType) => {
          const { id, title, overview, backdropPath } = result;
          return fade ? (
            <SwiperSlide key={id}>
              <S.BannerHead>
                <h3>{title}</h3>
                <p>{overview}</p>
              </S.BannerHead>
              <S.FadeBanner>
                <Image fill priority src={backdropPath} alt={id} />
              </S.FadeBanner>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={id}>
              {/* <Card card={{ id, poster_path, title }} carousel /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </S.CarouselLayout>
  );
}
