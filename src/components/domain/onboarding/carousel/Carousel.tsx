import Image from "next/image";
import { Pagination, EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
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
        loop
        pagination={{
          clickable: true,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
      >
        {data.map((result: OnboardingCarouselType) => {
          const { id, title, overview, backdropPath } = result;
          return (
            <SwiperSlide key={id}>
              <S.BannerHead>
                <h3>{title}</h3>
                <p>{overview}</p>
              </S.BannerHead>
              <S.FadeBanner>
                <Image fill priority src={backdropPath} alt="" />
              </S.FadeBanner>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </S.CarouselLayout>
  );
}
