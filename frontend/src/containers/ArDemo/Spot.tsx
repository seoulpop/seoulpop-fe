import { Circle, Entity, Ring } from '@belivvr/aframe-react';
import { useEffect } from 'react';

import { AR_Z_INDEX } from '@/styles/common';

const gpsEntityPlace = 'latitude: 51.0596; longitude: -0.7170'; // fake gps

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 60;
const minRadius = centerRadius + 30;
const maxRadius = 120;
const ringDelta = 5;
const duration = 2000;

const Spot = ({ visible, onClickSpot }: { visible?: boolean; onClickSpot: () => void }) => {
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

  return (
    <Entity position={{ x: 0, y: 0, z: AR_Z_INDEX.spot }} visible={visible}>
      <Circle color='#fff' radius={centerRadius} gps-new-entity-place={gpsEntityPlace} spot-click />
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
        gps-new-entity-place={gpsEntityPlace}
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
        gps-new-entity-place={gpsEntityPlace}
      />
    </Entity>
  );
};

export default Spot;
