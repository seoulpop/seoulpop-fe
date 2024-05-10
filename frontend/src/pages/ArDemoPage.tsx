import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { AssetItem, Assets, Camera, Entity, Scene } from '@belivvr/aframe-react';

// import useArMarkers from '@/hooks/server/useArMarkers';
import FoundButton from '@/containers/ArDemo/FoundButton';
import { MarkerInfo } from '@/types/ar';
import Spot from '@/containers/ArDemo/Spot';
import ArContents from '@/containers/ArDemo/ArContents';
// import InkTransition from '@/containers/ArDemo/InkTransition';

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/** 
const NEAR_METERS = 5;

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInMeters = ({
  lat1,
  lon1,
  lat2,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}) => {
  const R = 6371 * 1000; // 지구의 반지름 (미터로 변환)
  const dLat = deg2rad(lat2 - lat1); // 위도 차이
  const dLon = deg2rad(lon2 - lon1); // 경도 차이
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 거리 (미터)
  return d;
};
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

const ArDemo = () => {
  const [assetsReady, setAssetsReady] = useState(false);
  // const [position, setPosition] = useState<Position>();

  const [isOpen, setIsOpen] = useState<boolean>();

  const markerNearbyData: MarkerInfo[] = [
    {
      id: 1,
      lng: 127.0394685,
      lat: 37.5017073,
      name: 'test',
      category: '문화재',
    },
  ];

  /** TODO: api 연동
  useEffect(() => {
    const onUpdateGps = (event: unknown) => {
      console.log('hiiii');
      // TODO: 위치 업데이트 최적화
      const data = event as GeolocationCoordinates;
      const { position: pos } = data.detail;
      setPosition(pos);
    };

    document.addEventListener('gps-camera-update-position', onUpdateGps);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onUpdateGps);
    };
  }, []);
*/

  useEffect(() => {
    setAssetsReady(true);
  }, []);

  /** TODO: api 연동
  useEffect(() => {
    // 가까운 문화재, 역사를 포착
    const onObserveTarget = (event: unknown) => {
      const data = event as GeolocationCoordinates;
      const { position: pos } = data.detail;
      const nearestMarker = getNearestMarker({ markers: markerNearbyData, position: pos });

      const dist = getDistanceFromLatLonInMeters({
        lat1: pos.latitude,
        lon1: pos.longitude,
        lat2: nearestMarker.lat,
        lon2: nearestMarker.lng,
      });

      console.log(nearestMarker, pos);

      if (dist <= NEAR_METERS) setIsNearby(true);
      else setIsNearby(false);
    };

    document.addEventListener('gps-camera-update-position', onObserveTarget);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onObserveTarget);
    };
  }, []);
  */

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
        <Camera gps-new-camera='simulateLatitude: 51.049; simulateLongitude: -0.723' />
        <Assets>
          <AssetItem id='hamster' src='/assets/map_pointer/scene.gltf' />
          <img alt='asd' id='my-image' src='/public/assets/images/test.png' />
        </Assets>

        {assetsReady &&
          markerNearbyData &&
          markerNearbyData?.length > 0 &&
          markerNearbyData?.map(({ id, lat, lng }) => (
            <Entity
              key={id}
              id='hamster'
              gltfModel='#hamster'
              gps-new-entity-place={`latitude: ${lat}; longitude: ${lng}`}
              scale={{
                x: 0.05,
                y: 0.05,
                z: 0.05,
              }}
              hamevent
              animation-mixer='clip: *;'
            />
          ))}

        <Spot visible={!isOpen} onClickSpot={() => setIsOpen(true)} />
        <ArContents isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Scene>
    </SceneContainer>
  );
};

export default ArDemo;
