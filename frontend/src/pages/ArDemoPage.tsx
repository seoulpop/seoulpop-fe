import { AssetItem, Assets, Camera, Entity, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import FoundButton from '@/containers/ArDemo/FoundButton';
import { Z_INDEX } from '@/styles/common';

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

  useEffect(() => {
    setAssetsReady(true);

    AFRAME.registerComponent('hamevent', {
      init() {
        const { el } = this;
        el.addEventListener('click', () => {
          console.log('hello');
        });
      },
    });
  }, []);

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
        {assetsReady && (
          <Entity
            id='hamster'
            gltfModel='#hamster'
            gps-new-entity-place='latitude: 37.50183539829876; longitude: 127.03968585351448'
            scale={{
              x: 0.05,
              y: 0.05,
              z: 0.05,
            }}
            hamevent
            animation-mixer='clip: *;'
          />
        )}
      </Scene>
    </SceneContainer>
  );
};

export default ArDemo;
