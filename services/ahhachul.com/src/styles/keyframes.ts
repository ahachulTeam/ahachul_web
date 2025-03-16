import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  0% { opacity: 0;  }
  100% { opacity: 1;  }
`;

export const fade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
