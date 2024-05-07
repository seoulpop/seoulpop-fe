import { AssetItem, Assets, Camera, Entity, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import 'aframe-extras';

import useArMarkers from '@/hooks/server/useArMarkers';

import FoundButton from '@/containers/ArDemo/FoundButton';
import { Z_INDEX } from '@/styles/common';
import { GeolocationCoordinates, Position } from '@/types/ar';

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
`;

const ArDemo = () => {
  const [assetsReady, setAssetsReady] = useState(false);
  const [position, setPosition] = useState<Position>();
  const { markerNearbyData } = useArMarkers({
    lat: position?.latitude,
    lng: position?.longitude,
  });

  useEffect(() => {
    const onUpdateGps = (event: unknown) => {
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

  // TODO: 문화재가 없는 경우 UI
  return (
    <SceneContainer>
      <ButtonBlock>
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
