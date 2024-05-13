/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

import { IconCenter, IconDown, IconUp } from '#/svgs';
import { slideIn, slideOut } from '@/styles/animation';
import { BORDER_RADIUS, Z_INDEX } from '@/styles/common';
import { MarkerNearbyInfo } from '@/types/marker';

const carouselStyle = (visible: boolean) => css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${visible ? slideIn : slideOut} 0.5s cubic-bezier(0.86, 0, 0.07, 1) forwards;
  z-index: ${Z_INDEX.float};
`;

const BottomPanelAreaContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// TODO: 버튼 공통 컴포넌트로 바꿔야 함
const PanelToggleButtonStyle = css`
  width: 4.8rem;
  height: 4.8rem;
  margin-left: 2rem;
  background-color: var(--white);
  border: none;
  border-radius: ${BORDER_RADIUS.circle};
  box-shadow: var(--shadow);
  cursor: pointer;
`;

// TODO: 버튼 공통 컴포넌트로 바꿔야 함
const CenterLocationButtonStyle = css`
  width: 4.8rem;
  height: 4.8rem;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
  border-radius: ${BORDER_RADIUS.circle};
  box-shadow: var(--shadow);
  cursor: pointer;
`;

const CameraButton = styled(Button)``;

interface BottomPanelAreaProps {
  markerNearbyData?: MarkerNearbyInfo[];
  onCenterClick: () => void;
}

const BottomPanelArea = ({ markerNearbyData, onCenterClick }: BottomPanelAreaProps) => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div css={carouselStyle(isVisible)}>
      <BottomPanelAreaContainer>
        <button type='button' css={PanelToggleButtonStyle} onClick={togglePanel}>
          {isVisible ? <IconDown /> : <IconUp />}
        </button>
        <CameraButton
          type='button'
          size='large'
          color='var(--primary)'
          // TODO: url 변경
          onClick={() => navigate('/ardemo')}
        >
          <img src='/icons/camera_3d.webp' alt='camera' width={30} height={24} />
          카메라로 찍어보기
        </CameraButton>
        <button type='button' css={CenterLocationButtonStyle} onClick={onCenterClick}>
          <IconCenter />
        </button>
      </BottomPanelAreaContainer>
      <h1>Carousel 영역</h1>
      <p>여기에 하나씩 넣을거에요</p>
    </div>
  );
};

export default BottomPanelArea;
