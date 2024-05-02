/** @jsxImportSource @emotion/react */
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import { DEFAULT_MARKER_INFO } from '@/constants/map';
import useMaps from '@/hooks/server/useMap';
import { BORDER_RADIUS, Z_INDEX } from '@/styles/common';
import { MarkerInfo } from '@/types/marker';
import { slideIn, slideOut } from '@/styles/animation';
import { IconDown, IconUp } from '#/svgs';

import Button from '@/components/Button';

const KakaoMap = styled(Map)`
  width: 100svw;
  max-width: 480px;
  height: 100svh;
  overflow: hidden;
`;

const CategoryWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  gap: 0.8rem;
  z-index: ${Z_INDEX.float};
`;

const carouselStyle = (visible: boolean) => css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${visible ? slideIn : slideOut} 0.5s cubic-bezier(0.86, 0, 0.07, 1) forwards;
  z-index: ${Z_INDEX.float};
`;

const BottomPanelArea = styled.div`
  position: fixed;
  bottom: 10rem;
`;

// TODO: 버튼 공통 컴포넌트로 바꿔야 함
const PanelToggleButtonStyle = css`
  margin-left: 2rem;
  width: 4.8rem;
  height: 4.8rem;
  background-color: var(--white);
  border: none;
  border-radius: ${BORDER_RADIUS.circle};
  box-shadow: var(--shadow);
  cursor: pointer;
`;

const MainPage = () => {
  const { markerData } = useMaps();
  const [markerList, setMarkerList] = useState<MarkerInfo[]>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const handleMapCategoryClick = (index: number) => {
    setSelectedCategory(selectedCategory === index ? 0 : index);
  };

  useEffect(() => {
    if (markerData) setMarkerList(markerData);

    const categoryMap: { [key: number]: string } = {
      1: '문화재',
      2: '3·1운동',
      3: '6·25전쟁',
    };

    const filterMarkers = () => {
      if (selectedCategory === 0) return markerData;
      const category = categoryMap[selectedCategory];
      return markerData?.filter((data) => data.category === category);
    };

    setMarkerList(filterMarkers());
  }, [selectedCategory, markerData]);

  return (
    <KakaoMap center={{ lat: DEFAULT_MARKER_INFO.lat, lng: DEFAULT_MARKER_INFO.lng }}>
      <CategoryWrapper>
        <Button
          type='button'
          size='medium'
          onClick={() => handleMapCategoryClick(1)}
          color={selectedCategory === 1 ? 'var(--primary)' : 'var(--white)'}
        >
          <img src='/icons/gyeongbokgung.webp' alt='gyeongbokgung' width={24} height={24} />
          문화재
        </Button>
        <Button
          type='button'
          size='medium'
          onClick={() => handleMapCategoryClick(2)}
          color={selectedCategory === 2 ? 'var(--primary)' : 'var(--white)'}
        >
          <img src='/icons/korean_flag.webp' alt='korean-flag' width={24} height={24} />
          3·1운동
        </Button>
        <Button
          type='button'
          size='medium'
          onClick={() => handleMapCategoryClick(3)}
          color={selectedCategory === 3 ? 'var(--primary)' : 'var(--white)'}
        >
          <img src='/icons/soldier.webp' alt='soldier' width={24} height={24} />
          6·25전쟁
        </Button>
      </CategoryWrapper>

      {markerList === undefined ? (
        <MapMarker position={{ lat: DEFAULT_MARKER_INFO.lat, lng: DEFAULT_MARKER_INFO.lng }} />
      ) : (
        markerList.map((marker) => (
          <MapMarker position={{ lat: marker.lat, lng: marker.lng }} key={marker.id} />
        ))
      )}

      <div css={carouselStyle(isVisible)}>
        <BottomPanelArea>
          <button type='button' css={PanelToggleButtonStyle} onClick={togglePanel}>
            {isVisible ? <IconDown /> : <IconUp />}
          </button>
        </BottomPanelArea>
        <h1>Carousel 영역</h1>
        <p>여기에 하나씩 넣을거에요</p>
      </div>
    </KakaoMap>
  );
};

export default MainPage;
