/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { BORDER_RADIUS } from '@/styles/common';
import { deniedPermission, grantedPermission } from '@/styles/animation';

const wrapperStyle = (granted: boolean) => css`
  padding: 0;
  height: 2.8rem;
  width: 5rem;
  border: 1px solid var(--gray);
  border-radius: ${BORDER_RADIUS.lg};
  background-color: ${granted ? 'var(--primary)' : 'var(--gray)'};
`;

const sliderStyle = (granted: boolean) => css`
  height: 2rem;
  width: 2rem;
  margin: 0.3rem;
  margin-left: ${granted ? '2.4rem' : '0.3rem'};
  border-radius: ${BORDER_RADIUS.circle};
  background-color: var(--white);
  animation: ${granted ? grantedPermission : deniedPermission} 0.5s cubic-bezier(0.86, 0, 0.07, 1)
    forwards;
`;

interface SliderProps {
  type: 'submit' | 'reset' | 'button';
  granted: boolean;
  onClick?: () => void;
}

const PermissionSlider = ({ granted, type = 'button', onClick }: SliderProps) => {
  return (
    <button type={type} css={wrapperStyle(granted)} onClick={onClick}>
      <div css={sliderStyle(granted)} />
    </button>
  );
};
export default PermissionSlider;
