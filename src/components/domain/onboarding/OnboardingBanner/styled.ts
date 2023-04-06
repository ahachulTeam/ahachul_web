import { css, styled } from "styled-components";

export const BannerWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > .slick-slider > .slick-dots {
      bottom: 35px;

      & > li {
        width: 7px;
        height: 7px;
        background-color: #d9d9d9;
        border-radius: 0.5rem;

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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const BannerHead = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    margin-bottom: 20px;

    & > h3 {
      ${theme.fonts.extraBold28};
      color; ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.regular14};
      line-height: 2.1;
      color: ${theme.colors.gray_40};
    }
  `}
`;

export const BannerImg = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > svg {
    max-height: 100%;
    object-fit: cover;
  }
`;
