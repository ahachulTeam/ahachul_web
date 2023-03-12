import { css } from "styled-components";

import { breakPoint } from "@/styles/themes/breakPoint";

export const size = {
  header: {
    height_d: "80px",
    height_m: "60px",
  },
  footer: {
    height_d: "322px",
    height_t: "348px",
    height_m: "412px",
  },
  container: css`
    max-width: 100%;
    width: 100vw;
    padding: 0 20px;

    @media ${breakPoint.device.tablet} {
      max-width: 1069px;
      margin: 0 auto;
    }
    @media ${breakPoint.device.desktop} {
      max-width: 1240px;
    }
  `,
} as const;

export type SizeTheme = typeof size;
