import { PropsWithChildren } from 'react'
import { Pagination, EffectFade, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import * as S from './styled'

interface CarouselProps extends PropsWithChildren {
  fade: boolean
}

export default function Carousel({ children, fade = false }: CarouselProps) {
  return (
    <S.CarouselLayout data-fade={Boolean(fade)}>
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
        {children}
      </Swiper>
    </S.CarouselLayout>
  )
}

Carousel.Slide = SwiperSlide
