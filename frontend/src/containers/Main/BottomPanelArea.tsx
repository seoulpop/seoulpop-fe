/** @jsxImportSource @emotion/react */
import Flicking from '@egjs/react-flicking';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

import { IconCenter, IconDown, IconUp } from '#/svgs';
import { TABBAR_HEIGHT } from '@/constants/components';
import { bottomPanelSlideIn, bottomPanelSlideOut } from '@/styles/animation';
import { BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';
import { MarkerInfo, MarkerNearbyInfo } from '@/types/marker';

import isMobile from '@/utils/isMobile';
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

const carouselStyle = (visible: boolean) => css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${visible ? bottomPanelSlideIn : bottomPanelSlideOut} 0.5s
    cubic-bezier(0.86, 0, 0.07, 1) forwards;
  z-index: ${Z_INDEX.float};
`;

const BottomPanelAreaContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 30rem; // carosel 아이템 높이
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

const Carousel = styled.div`
  margin: 0.5rem 2rem ${TABBAR_HEIGHT + 2}rem;
`;

const StyledFlicking = styled(Flicking)`
  height: 19.5rem;

  .flicking-viewport {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    align-items: center;
  }
  .flicking-camera {
    display: flex;
    height: 100%;
  }

  &:first-of-child {
    padding-left: 2rem;
  }
  &:last-of-child {
    padding-right: 2rem;
  }
`;

const NearbyDataItem = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
  justify-content: space-betweent;
  align-items: center;
  overflow: hidden;

  width: 20.6rem;
  min-width: 20.6rem;
  margin: 0.3rem 2rem 0.3rem 0;
  border-radius: ${BORDER_RADIUS.lg};

  background: var(--white);
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 9.8rem;

  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 0.6rem;
  padding: 0 14px;

  font-size: ${FONT_SIZE.md};

  .name {
    font-weight: 600;
  }

  .address {
    color: var(--darkgray);
  }
`;

const EmptyCarousel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

interface BottomPanelAreaProps {
  markerNearbyData?: MarkerNearbyInfo[];
  onCenterClick: () => void;
  handleMarkerClick: (marker: MarkerInfo) => void;
}

const BottomPanelArea = ({
  markerNearbyData,
  onCenterClick,
  handleMarkerClick,
}: BottomPanelAreaProps) => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const handleARCamera = async () => {
    if (Capacitor.getPlatform() === 'android') {
      const status = await Camera.requestPermissions();
      if (status.camera === 'granted') {
        navigate('/ardemo');
      } else {
        navigate('/setting');
      }
      return;
    }

    if (!isMobile()) {
      navigate('/ar-pc');
      return;
    }
    navigate('/ardemo');
  };

  useEffect(() => {
    if (!markerNearbyData || !markerNearbyData.length) {
      setIsVisible(false);
    }
  }, []);

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
          onClick={handleARCamera}
        >
          <img src='/icons/camera_3d.webp' alt='camera' width={30} height={24} />
          카메라로 찍어보기
        </CameraButton>
        <button type='button' css={CenterLocationButtonStyle} onClick={onCenterClick}>
          <IconCenter />
        </button>
      </BottomPanelAreaContainer>

      <Carousel>
        <StyledFlicking align='prev' bound>
          {markerNearbyData && markerNearbyData.length ? (
            markerNearbyData.map(
              ({ id, thumbnail, name, address, lat, lng, category, visited }) => (
                <NearbyDataItem
                  key={id}
                  role='button'
                  onClick={() => handleMarkerClick({ category, id, lat, lng, name, visited })}
                >
                  <ThumbnailWrapper>
                    <Thumbnail src={thumbnail} alt={name} />
                  </ThumbnailWrapper>
                  <Info>
                    <p className='name'>{name}</p>
                    <p className='address'>{address}</p>
                  </Info>
                </NearbyDataItem>
              ),
            )
          ) : (
            <NearbyDataItem>
              <EmptyCarousel>
                <span>내 근처에</span>
                <span>문화재가 없어요.</span>
              </EmptyCarousel>
            </NearbyDataItem>
          )}
        </StyledFlicking>
      </Carousel>
    </div>
  );
};

export default BottomPanelArea;
