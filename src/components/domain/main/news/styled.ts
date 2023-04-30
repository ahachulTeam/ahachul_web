import { css, styled } from "styled-components";

export const NewsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    cursor: pointer;

    & > .slick-slider > .slick-dots {
      bottom: 75px;

      & > li {
        width: 7px;
        height: 7px;
        background-color: #d9d9d9;
        border-radius: 5px;

        & > button {
          display: none;
        }

        & > .slick-active {
          transition: all 0.3s ease-in-out;
        }
      }
    }

    & > .slick-slider > .slick-dots > .slick-active {
      width: 7px;
      height: 7px;
      background-color: ${theme.colors.primary};
      border-radius: 37px;
    }
  `}
`;

export const Banner = styled.div`
  position: relative;
  width: 100%;
`;

export const BannerImg = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > img {
    max-height: 100%;
    object-fit: cover;
  }
`;

export const BannerInfo = styled.div`
  ${({ theme }) => css`
    position: absolute;
    left: 50%;
    bottom: 20px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: calc(100% - 52px);
    height: 42px;
    border-radius: 90px;
    padding: 0 12px;
    background-color: ${theme.colors.primary};
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
    transform: translateX(-50%);

    & > p {
      ${theme.fonts.regular12};
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;
      height: 18px;
      border: 1px solid ${theme.colors.white};
      border-radius: 42px;
      padding: 0 6px;
      color: ${theme.colors.white};
    }

    & > h4 {
      ${theme.fonts.semibold14};
      color: ${theme.colors.white};
    }
  `}
`;
