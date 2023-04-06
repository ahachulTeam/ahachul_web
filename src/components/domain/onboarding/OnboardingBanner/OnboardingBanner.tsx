import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ONBOARDING_SLIDER_IMAGES } from "@/assets/static";

import * as S from "./styled";

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 4000,
  cssEase: "linear",
};

export default function OnboardingBanner() {
  return (
    <S.BannerWrapper>
      <Slider {...SLIDER_SETTINGS}>
        {ONBOARDING_SLIDER_IMAGES.map(({ id, bannerImg, subTitle, title }) => (
          <S.Banner key={id}>
            <S.BannerHead>
              <h3>{title}</h3>
              <p>{subTitle}</p>
            </S.BannerHead>
            <S.BannerImg>{bannerImg}</S.BannerImg>
          </S.Banner>
        ))}
      </Slider>
    </S.BannerWrapper>
  );
}
