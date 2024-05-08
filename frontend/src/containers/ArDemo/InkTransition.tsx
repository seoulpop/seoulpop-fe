import styled from '@emotion/styled';
import { useState } from 'react';

import { Z_INDEX } from '@/styles/common';

const InkTransitionContainer = styled.div`
  // 참고 https://codepen.io/iamryanyu/pen/GXpyLQ
  @keyframes ink-transition {
    0% {
      transform: translateX(-1.25%);
    }

    99% {
      transform: translateX(-98.75%);
      opacity: 1;
    }

    100% {
      transform: translateX(-98.75%);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  position: relative;
  overflow: hidden;
  z-index: ${Z_INDEX.float};

  width: 100%;
  opacity: 0;

  &::after {
    //animation: ink-transition 1.5s steps(39) 0.5s forwards;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/204808/ink-transition-sprite.png');
    background-size: 100% 100%;
    content: '';
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-1.25%);
    width: 4000%;
  }

  &.is-active {
    animation: fadeIn 2s steps(39) forwards;
  }

  &.is-active::after {
    animation: ink-transition 2s steps(39) 0.5s forwards;
  }

  /** 
  TODO: 이미지 닫을 때 애니메이션 리버스 재생 
  &.is-reverse-active {
    animation: fadeIn 2s steps(39) reverse;
  }

  &.is-reverse-active::after {
    animation: ink-transition 2s steps(39) 0.5s reverse;
  }
   */
`;

// TODO: width가 디바이스보다 큰 경우 터치해서 이미지 확인 가능
const Contents = styled.img`
  width: 100%;
  height: 100svh;
`;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const InkTransition = ({ isActive, onClose }: { isActive: boolean; onClose: () => void }) => {
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  /** const [isReverseActive, setIsReverseActive] = useState(false); */

  const handleClose = () => {
    // 잉크 애니메이션 끝난 후 실행 가능
    if (!isAnimationEnd) return;
    /** setIsReverseActive(true); */
    onClose();
  };

  let className = '';
  if (isActive) {
    className = 'is-active';
  }
  /**  
  if (isReverseActive) {
    className = 'is-reverse-active';
  }
  */

  return (
    <InkTransitionContainer
      className={className}
      onAnimationEnd={() => setIsAnimationEnd(true)}
      onTouchStart={isMobile ? handleClose : undefined}
      onClick={!isMobile ? handleClose : undefined}
    >
      <Contents src='/public/assets/images/test.png' />
    </InkTransitionContainer>
  );
};

export default InkTransition;
