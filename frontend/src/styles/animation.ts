import { keyframes } from '@emotion/react';

export const bottomPanelSlideIn = keyframes`
  from {
    transform: translateY(calc(100% - 7.5rem));
  }
  to {
    transform: translateY(0);
  }
`;

export const bottomPanelSlideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(100% - 7.5rem));
  }
`;

export const directionPanelSlideIn = keyframes`
  from {
    transform: translateY(-8.8rem);
  }
  to {
    transform: translateY(0);
  }
`;

export const directionPanelSlideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-8.8rem);
  }
`;
