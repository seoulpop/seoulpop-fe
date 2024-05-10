import { Circle, Entity, Ring, Plane } from '@belivvr/aframe-react';
import { useEffect, useState } from 'react';

import { AR_Z_INDEX } from '@/styles/common';

const gpsEntityPlace = 'latitude: 51.0596; longitude: -0.7170'; // fake gps

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 60;
const minRadius = centerRadius + 30;
const maxRadius = 120;
const ringDelta = 5;
const duration = 2000;

const Spot = ({ visible, onClickSpot }: { visible?: boolean; onClickSpot: () => void }) => {
  const [dist] = useState(333);

  useEffect(() => {
    const clickHandler = () => {
      onClickSpot();
    };

    AFRAME.registerComponent('spot-click', {
      init() {
        const { el } = this;
        el.addEventListener('click', clickHandler);
      },
      remove() {
        const { el } = this;
        el.removeEventListener('click', clickHandler);
      },
    });
  }, []);

  useEffect(() => {
    const el = document.getElementById('distance');
    if (el) el.setAttribute('text', 'value', `${dist}m`); // setAttribute('material', 'color', 'red') https://aframe.io/docs/1.5.0/core/component.html
  }, [dist]);

  return (
    <Entity
      position={{ x: 0, y: 0, z: AR_Z_INDEX.spot }}
      visible={visible}
      gps-new-entity-place={gpsEntityPlace}
    >
      <Circle color='#fff' radius={centerRadius} spot-click />
      <Circle
        color='#fff'
        radius={maxRadius}
        animation__opacity={{
          property: 'material.opacity',
          from: '0',
          to: '0.6',
          dur: duration,
          dir: 'alternate',
          loop: loopInfinity,
        }}
        // XXX: scale로 변경
        animation__radius={{
          property: 'geometry.radius',
          from: `${minRadius}`,
          to: `${maxRadius}`,
          dur: duration,
          dir: 'alternate',
          loop: loopInfinity,
        }}
        spot-click
      />
      <Ring
        color='#fff'
        radiusInner={115}
        radiusOuter={120}
        // XXX: scale로 변경
        animation={{
          property: 'geometry.radiusInner',
          from: `${minRadius}`,
          to: `${maxRadius - ringDelta}`,
          dur: duration,
          dir: 'alternate',
          loop: loopInfinity,
        }}
        animation__2={{
          property: 'geometry.radiusOuter',
          from: `${minRadius + ringDelta}`,
          to: `${maxRadius}`,
          dur: duration,
          dir: 'alternate',
          loop: loopInfinity, // XXX: true가 먹지 않음
        }}
        spot-click
      />

      {/* 문화재명, 거리  */}
      <Entity position={{ x: 0, y: 300, z: 0 }}>
        <Plane
          id='distance'
          height={200}
          width={1500}
          text={{ value: '안asdasdj녕?', color: '#000' }}
        />
      </Entity>
    </Entity>
  );
};

export default Spot;
