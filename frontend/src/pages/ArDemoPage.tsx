import { AssetItem, Assets, Camera, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

// import useArMarkers from '@/hooks/server/useArMarkers';

import ArContents from '@/containers/ArDemo/ArContents';
import FoundButton from '@/containers/ArDemo/FoundButton';
import Spot from '@/containers/ArDemo/Spot';
import { GeolocationCoordinates, MarkerInfo, Position } from '@/types/ar';

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

// 테스트용 데이터
const MOCK_DATA: MarkerInfo[] = [
  {
    id: 1,
    lng: -0.7165,
    lat: 51.0595,
    name: '테스트',
    category: '문화재',
    // arImage: '/assets/images/test.png',
  },
  {
    id: 2,
    lng: -0.716,
    lat: 51.0595,
    name: '테스트',
    category: '문화재',
    // arImage: '/assets/images/test.png',
  },
];

const ArDemo = () => {
  const [position, setPosition] = useState<Position>();
  const [clickItem, setClickItem] = useState<MarkerInfo>();
  const [isOpen, setIsOpen] = useState<boolean>();

  /** TODO: 기능 개발 후 실제 데이터 연결  
  const { markerNearbyData } = useArMarkers({
    lat: position?.latitude,
    lng: position?.longitude,
  });
  */

  const markerNearbyData = MOCK_DATA;

  useEffect(() => {
    const onUpdateGps = (event: unknown) => {
      // TODO: 위치 업데이트 최적화
      const geolocationCoordinates = event as GeolocationCoordinates;
      const { position: pos } = geolocationCoordinates.detail;
      setPosition(pos);
    };

    document.addEventListener('gps-camera-update-position', onUpdateGps);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onUpdateGps);
    };
  }, []);

  useEffect(() => {
    return () => {
      // aframe에 의한 클래스 스타일 제거
      document.querySelector('html').classList.remove('a-fullscreen');
    };
  }, []);

  // FIXME: 여러 문화재가 뜨는 경우 클릭이 안됨
  // TODO: 문화재가 없는 경우 UI
  return (
    <SceneContainer>
      <FoundButton isOpen={isOpen} heritage={clickItem} />
      <Scene
        vr-mode-ui='enabled: false'
        cursor='rayOrigin: mouse'
        raycaster='near: 0; far: 50000'
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false;'
        renderer={{ antialias: true, alpha: true }}
      >
        <Camera gps-new-camera='gpsMinDistance: 1; simulateLatitude: 51.059; simulateLongitude: -0.717' />
        <Assets>
          <AssetItem id='hamster' src='/assets/map_pointer/scene.gltf' />
          <img alt='asd' id='my-image' src='/public/assets/images/test.png' />
        </Assets>

        {markerNearbyData &&
          markerNearbyData?.length > 0 &&
          markerNearbyData?.map((heritage) => {
            const { id, lat, lng, arImage } = heritage;
            return (
              <>
                <Spot
                  key={id}
                  visible={!isOpen}
                  lat={lat}
                  lng={lng}
                  heritage={heritage}
                  onClickSpot={(heritageId) => {
                    console.log(heritageId);
                    setIsOpen(true);
                    setClickItem(heritage);
                  }}
                  position={position}
                  hasArContents={!!arImage}
                />
                {/** TODO: 50미터 이내에서만 컨텐츠 확인 가능 */}
                <ArContents
                  key={id}
                  isOpen={isOpen}
                  lat={lat}
                  lng={lng}
                  arImage={arImage}
                  onClose={() => setIsOpen(false)}
                />
              </>
            );
          })}
      </Scene>
    </SceneContainer>
  );
};

export default ArDemo;
