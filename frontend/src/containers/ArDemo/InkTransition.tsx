import styled from '@emotion/styled';

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
`;

// TODO: width가 디바이스보다 큰 경우 터치해서 이미지 확인 가능
const Contents = styled.img`
  width: 100%;
  height: 100svh;
`;

const InkTransition = ({ isNearby }: { isNearby: boolean }) => {
  return (
    <InkTransitionContainer className={`${isNearby ? 'is-active' : ''}`}>
      <Contents src='/public/assets/images/test.png' />
    </InkTransitionContainer>
  );
};

export default InkTransition;
