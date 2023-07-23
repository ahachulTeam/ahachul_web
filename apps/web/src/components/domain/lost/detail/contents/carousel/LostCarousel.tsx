import Image from 'next/image'

import * as S from './LostCarousel.styled'
import { Carousel } from '@/components/common'
import type { LostDetail } from '@/types/lost'

interface LostCarouselProps {
  images: LostDetail['images']
}

export default function LostCarousel({ images }: LostCarouselProps) {
  return (
    <Carousel css={S.carousel} options={{ effect: 'slide', autoplay: false }}>
      {images.map(img => (
        <Carousel.Slide key={img.imageId}>
          <S.ImageWrapper>
            <Image fill priority src={img.imageUrl} alt="" />
          </S.ImageWrapper>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
