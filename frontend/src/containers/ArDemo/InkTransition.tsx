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

  width: 60%;
  opacity: 0;

  &::before {
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/204808/ink-photo-frame.png');
    background-size: 100% 100%;
    background-position: 50% 50%;
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
  }

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
`;

const Contents = styled.img`
  width: 100%;
  height: auto;
`;

const FooButton = styled.button`
  position: absolute;
  left: 50%;
  z-index: ${Z_INDEX.float + 1};
`;

const InkTransition = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <FooButton onClick={() => setIsActive((prev) => !prev)}>버튼</FooButton>
      <InkTransitionContainer className={`${isActive ? 'is-active' : ''}`}>
        <Contents src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/204808/Hyewon-Wolha-jeongin.jpg' />
      </InkTransitionContainer>
    </>
  );
};

export default InkTransition;
