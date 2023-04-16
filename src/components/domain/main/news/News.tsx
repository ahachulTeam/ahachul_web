"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { NEWS_SLIDER_IMAGES } from "@/assets/static";

import * as S from "./styled";

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  speed: 700,
  autoplaySpeed: 4000,
  cssEase: "linear",
};

function News() {
  return (
    <S.NewsWrapper>
      <Slider {...SLIDER_SETTINGS}>
        {NEWS_SLIDER_IMAGES.map(({ id, bannerImg, subway, title }) => (
          <S.Banner key={title}>
            <S.BannerImg>{bannerImg}</S.BannerImg>
            <S.BannerInfo>
              <p>{subway}</p>
              <h4>{title}</h4>
            </S.BannerInfo>
          </S.Banner>
        ))}
      </Slider>
    </S.NewsWrapper>
  );
}

export default News;
