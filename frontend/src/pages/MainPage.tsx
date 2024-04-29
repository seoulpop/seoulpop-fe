import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';

const KakaoMap = styled(Map)`
  width: 100svw;
  max-width: 480px;
  height: 100svh;
  overflow: hidden;
`;

const MainPage = () => {
  return (
    <KakaoMap center={{ lat: 37.559722, lng: 126.975278 }}>
      <MapMarker position={{ lat: 37.559722, lng: 126.975278 }} />
    </KakaoMap>
  );
};

export default MainPage;
