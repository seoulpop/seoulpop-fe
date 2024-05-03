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
        <Camera cursor={{ rayOrigin: 'mouse' }} />

        <Assets>
          <AssetItem id='hamster' src='/assets/hamster/scene.gltf' />
        </Assets>
        {assetsReady && (
          <Entity
            id='hamster'
            gltfModel='#hamster'
            position={{ x: 0, y: 1.5, z: -0.2 }}
            scale={{
              x: 0.2,
              y: 0.2,
              z: 0.2,
            }}
            hamevent
          />
        )}
      </Scene>
    </SceneContainer>
  );
};

export default ArDemo;
