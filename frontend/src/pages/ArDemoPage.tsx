import { AssetItem, Assets, Camera, Entity, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
// import 'aframe-extras';

import useArMarkers from '@/hooks/server/useArMarkers';

import FoundButton from '@/containers/ArDemo/FoundButton';
import { Z_INDEX } from '@/styles/common';
import { GeolocationCoordinates, MarkerInfo, Position } from '@/types/ar';

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonBlock = styled.div`
  position: fixed;
  left: 50%;
  bottom: 5.4rem;
  transform: translate(-50%, 0);

  min-width: 27.7rem;

  z-index: ${Z_INDEX.float};
  display: none;
  &.is-active {
    display: block;
  }
`;

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

/**
 * 현재 위치에서 가장 가까운 마커를 반환
 */
const getNearestMarker = ({ markers, position }: { markers: MarkerInfo[]; position: Position }) => {
  const marekr = markers[0];
  return marekr;
};

const ArDemo = () => {
  const [assetsReady, setAssetsReady] = useState(false);
  const [position, setPosition] = useState<Position>();
  const { _markerNearbyData, isMarkerNearbyLoading: isLoading } = useArMarkers({
    lat: position?.latitude,
    lng: position?.longitude,
  });
  const [isNearby, setIsNearby] = useState(false);

  const markerNearbyData: MarkerInfo[] = [
    { id: 1, lng: 127.0877147, lat: 37.4714547, name: 'asd', category: '문화재' },
  ];

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

  useEffect(() => {
    setAssetsReady(true);
  }, []);

  useEffect(() => {
    /**
     * 가까운 문화재, 역사를 포착
     */
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

      if (dist <= NEAR_METERS) setIsNearby(true);
      else setIsNearby(false);
    };

    document.addEventListener('gps-camera-update-position', onObserveTarget);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onObserveTarget);
    };
  }, []);

  // TODO: 문화재가 없는 경우 UI
  return (
    <SceneContainer>
      {/* <InkTransition /> */}
      <ButtonBlock className={`${isNearby ? 'is-active' : ''}`}>
        <FoundButton />
      </ButtonBlock>
      <Scene
        vrModeUI={{ enabled: false }}
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
        renderer={{
          antialias: true,
          alpha: true,
        }}
      >
        <Camera gps-new-camera='gpsMinDistance: 5' />

        <Assets>
          <AssetItem id='hamster' src='/assets/map_pointer/scene.gltf' />
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
      </Scene>
    </SceneContainer>
  );
};

export default ArDemo;
