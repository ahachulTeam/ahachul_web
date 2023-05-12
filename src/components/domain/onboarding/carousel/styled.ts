import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CarouselLayout = styled.div`
  ${({ theme }) => css`
    position: relative;

    .swiper {
      position: relative;
      padding: 4px 8px;
    }

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
