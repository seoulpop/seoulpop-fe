import { useEffect, useState } from 'react';
import 'aframe';
import { AssetItem, Assets, Entity, Scene } from '@belivvr/aframe-react';

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
    <Scene cursor='rayOrigin: mouse'>
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
  );
};

export default ArDemo;
