import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';

import { DEFAULT_MARKER_INFO } from '@/constants/map';
import useMaps from '@/hooks/server/useMap';

const KakaoMap = styled(Map)`
  width: 100svw;
  max-width: 480px;
  height: 100svh;
  overflow: hidden;
`;

const MainPage = () => {
  const { markerData } = useMaps();
  const { lat: defaultLat, lng: defaultLng } = DEFAULT_MARKER_INFO;

  return (
    <KakaoMap center={{ lat: defaultLat, lng: defaultLng }}>
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
