import styled, { css } from "styled-components";

export const CarouselLayout = styled.div`
  ${({ theme }) => css`
    .swiper {
      position: relative;
      padding: 4px 8px;
    }

    .swiper-pagination {
      top: 0;
      bottom: auto;
      padding-right: 8vw;
      text-align: right;
    }

    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        display: flex !important;
      }
      .swiper-pagination {
        display: block !important;
      }
    }

    &[data-fade="true"] {
      position: relative;

      .swiper-pagination {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: flex !important;
        justify-content: center;
        width: 100%;
        height: max-content;
        padding: 30px 0 35px;
        background: ${theme.colors.white};
        transform: translateX(-50%);
        z-index: ${theme.zIndex.sticky};
      }

      .swiper-pagination-bullet {
        background: #d9d9d9;
        transition: all 0.3s linear;

        &-active {
          width: 23px;
          border-radius: 37px;
          background: ${theme.colors.primary};
        }
      }

      .swiper-button-prev,
      .swiper-button-next {
        display: none !important;
      }
    }

    div.btn-all {
      display: none;
      position: absolute;
      right: 2.5vw;
      font-size: 0.8rem;
      line-height: 1.6rem;
      color: rgba(255, 255, 255, 0.7);
      z-index: 2;
      cursor: pointer;
    }

    div.btn-detail {
      color: white;
      position: absolute;
      right: 3vw;
      top: 32vw;
      border: 1px solid white;
      border-radius: 4px;
      padding: 1vw 2vw;
      font-size: 1vw;
      z-index: 6;
    }

    &:hover {
      div.btn-all {
        display: block;
      }
    }
  `}
`;

export const FadeBanner = styled.div`
  position: relative;
  width: 100%;
  height: 450px;

  @media only screen and (max-height: 768px) {
    height: 340px;
  }
`;

export const BannerHead = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    
    & > h3 {
      ${theme.fonts.bold24};
      color; ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.medium16};
      color: rgb(120, 131, 145);
    }
  `}
`;
