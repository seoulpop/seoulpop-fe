import { keyframes } from '@emotion/react';

export const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;
