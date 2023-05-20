import Image from "next/image";

import { Carousel } from "@/components/common";

import { ONBOARDING_CAROUSELS } from "@/assets/static";

import * as S from "./styled";

export default function OnboardingCarousel() {
  return (
    <Carousel fade>
      {ONBOARDING_CAROUSELS.map(result => {
        const { id, title, overview, backdropPath } = result;
        return (
          <Carousel.Slide key={id}>
            <S.BannerHead>
              <h3>{title}</h3>
              <p>{overview}</p>
            </S.BannerHead>
            <S.FadeBanner>
              <Image fill priority src={backdropPath} alt="" />
            </S.FadeBanner>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
