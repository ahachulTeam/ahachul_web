import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  0% { opacity: 0;  }
  100% { opacity: 1;  }
`;

export const rotate = keyframes`
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
`;
