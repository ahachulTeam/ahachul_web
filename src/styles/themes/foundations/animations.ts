import { keyframes } from "@emotion/react";

export const animations = {
  slideUpAndFade: keyframes`
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  `,
} as const;

export type AnimationsType = typeof animations;
