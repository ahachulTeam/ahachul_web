import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
