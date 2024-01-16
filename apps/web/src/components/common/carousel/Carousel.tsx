// import { PropsWithChildren } from 'react'
// import { Pagination, EffectFade, Autoplay, type SwiperOptions } from 'swiper'
// import 'swiper/css'
// import 'swiper/css/effect-fade'
// import 'swiper/css/pagination'
// import { Swiper, SwiperSlide } from 'swiper/react'

// import * as S from './styled'

// interface CarouselProps extends PropsWithChildren {
//   className?: string
//   options?: SwiperOptions
// }

// export default function Carousel({ children, className, options }: CarouselProps) {
//   return (
//     <S.CarouselLayout className={className}>
//       <Swiper
//         loop
//         pagination={{
//           clickable: true,
//         }}
//         effect="fade"
//         fadeEffect={{ crossFade: true }}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         modules={[Pagination, EffectFade, Autoplay]}
//         {...options}
//       >
//         {children}
//       </Swiper>
//     </S.CarouselLayout>
//   )
// }

// Carousel.Slide = SwiperSlide

export {};
