import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';

import { DEFAULT_MARKER_INFO } from '@/constants/map';
import useMaps from '@/hooks/server/useMap';
import { Z_INDEX } from '@/styles/common';

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
  const { lat: defaultLat, lng: defaultLng } = DEFAULT_MARKER_INFO;

  return (
    <KakaoMap center={{ lat: defaultLat, lng: defaultLng }}>
      <CategoryWrapper>
        <Button type='button' size='medium'>
          <img src='/icons/gyeongbokgung.webp' alt='gyeongbokgung' width={24} height={24} />
          문화재
        </Button>
        <Button type='button' size='medium'>
          <img src='/icons/korean_flag.webp' alt='korean-flag' width={24} height={24} />
          3·1운동
        </Button>
        <Button type='button' size='medium'>
          <img src='/icons/soldier.webp' alt='soldier' width={24} height={24} />
          6·25전쟁
        </Button>
      </CategoryWrapper>
      {markerData === undefined ? (
        <MapMarker position={{ lat: defaultLat, lng: defaultLng }} />
      ) : (
        markerData.map((marker) => (
          <MapMarker position={{ lat: marker.lat, lng: marker.lng }} key={marker.id} />
        ))
      )}
    </KakaoMap>
  );
};

export default MainPage;
