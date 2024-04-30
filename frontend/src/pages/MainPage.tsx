import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { DEFAULT_MARKER_INFO } from '@/constants/map';
import useMaps from '@/hooks/server/useMap';
import { Z_INDEX } from '@/styles/common';
import { MarkerInfo } from '@/types/marker';

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

const MainPage = () => {
  const { markerData } = useMaps();
  const [markerList, setMarkerList] = useState<MarkerInfo[]>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const handleMapCategoryClick = (index: number) => {
    setSelectedCategory(selectedCategory === index ? 0 : index);
  };

  useEffect(() => {
    if (markerData) setMarkerList(markerData);
  }, [markerData]);

  useEffect(() => {
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
    </KakaoMap>
  );
};

export default MainPage;
