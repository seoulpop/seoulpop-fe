import { AssetItem, Assets, Camera, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import useArMarkers from '@/hooks/server/useArMarkers';

// import ArContents from '@/containers/ArDemo/ArContents';
import FoundButton from '@/containers/ArDemo/FoundButton';
import Spot from '@/containers/ArDemo/Spot';
import { MarkerInfo, Position, GeolocationCoordinates } from '@/types/ar';
import ArContents from '@/containers/ArDemo/ArContents';
// import InkTransition from '@/containers/ArDemo/InkTransition';

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/** 
const NEAR_METERS = 5;
*/

/**
 * 현재 위치에서 가장 가까운 마커를 반환
 */
/** 
const getNearestMarker = ({ markers, position }: { markers: MarkerInfo[]; position: Position }) => {
  const marekr = markers[0];
  return marekr;
};
*/

// 테스트용 데이터
const MOCK_DATA: MarkerInfo[] = [
  {
    id: 9876,
    lng: 127.03968585351448,
    lat: 37.50183539829876,
    name: '멀티캠퍼스',
    category: '문화재',
  },
  {
    id: 98765,
    lng: 127.04035642747931,
    lat: 37.50073757660469,
    name: '메머드커피',
    category: '문화재',
  },
  {
    id: 987654,
    lng: -0.7165,
    lat: 51.0595,
    name: '테스트',
    category: '문화재',
  },
];

const ArDemo = () => {
  const [, setAssetsReady] = useState(false);
  const [position, setPosition] = useState<Position>();

  const [isOpen, setIsOpen] = useState<boolean>();

  const { markerNearbyData: data } = useArMarkers({
    lat: position?.latitude,
    lng: position?.longitude,
  });
  const markerNearbyData = [MOCK_DATA[2]]; // data?.map((d) => d);
  // MOCK_DATA.forEach((d) => markerNearbyData?.push(d));

  useEffect(() => {
    setAssetsReady(true);
  }, []);

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

  // TODO: 문화재가 없는 경우 UI
  return (
    <SceneContainer>
      {/* <InkTransition isActive={true} onClose={() => console.log('hi')} /> */}
      <FoundButton isOpen={isOpen} />
      <Scene
        vr-mode-ui='enabled: false'
        cursor='rayOrigin: mouse'
        raycaster='near: 0; far: 50000'
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false;'
        renderer={{ antialias: true, alpha: true }}
      >
        <Camera gps-new-camera='simulateLatitude: 51.059; simulateLongitude: -0.717' />
        <Assets>
          <AssetItem id='hamster' src='/assets/map_pointer/scene.gltf' />
          <img alt='asd' id='my-image' src='/public/assets/images/test.png' />
        </Assets>

        {/* 
        {markerNearbyData &&
          markerNearbyData?.length > 0 &&
          markerNearbyData?.map(({ id, lat, lng }) => (
            <>
              <Spot
                key={id}
                visible={!isOpen}
                lat={lat}
                lng={lng}
                onClickSpot={() => setIsOpen(true)}
                position={position}
              />
              <ArContents
                key={id}
                isOpen={isOpen}
                // fake gps
                lat={lat}
                lng={lng}
                onClose={() => setIsOpen(false)}
              />
            </>
          ))}
*/}
        <Spot
          visible={!isOpen}
          // 멀티캠퍼스 gps
          lat={markerNearbyData[0].lat}
          lng={markerNearbyData[0].lng}
          onClickSpot={() => setIsOpen(true)}
        />
        <ArContents
          isOpen={isOpen}
          // fake gps
          lat={markerNearbyData[0].lat}
          lng={markerNearbyData[0].lng}
          onClose={() => setIsOpen(false)}
        />
      </Scene>
    </SceneContainer>
  );
};

export default ArDemo;
