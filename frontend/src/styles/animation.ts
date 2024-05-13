import { keyframes } from '@emotion/react';

export const slideIn = keyframes`
  from {
    transform: translateY(calc(100% - 7.5rem));
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
    transform: translateY(calc(100% - 7.5rem));
  }
`;
