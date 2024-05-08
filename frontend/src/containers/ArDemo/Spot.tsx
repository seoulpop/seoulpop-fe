import { Circle, Ring } from '@belivvr/aframe-react';

const gpsEntityPlace = 'latitude: 51.0596; longitude: -0.7170'; // fake gps
const entityId = 'spot';

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 60;
const minRadius = centerRadius + 30;
const maxRadius = 120;
const ringDelta = 5;
const duration = 2000;

const Spot = () => {
  return (
    <>
      <Circle
        id={entityId}
        color='#fff'
        radius={centerRadius}
        gps-new-entity-place={gpsEntityPlace}
      />
      <Circle
        id={entityId}
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
        animation__radius={{
          property: 'geometry.radius',
          from: `${minRadius}`,
          to: `${maxRadius}`,
          dur: duration,
          dir: 'alternate',
          loop: loopInfinity,
        }}
        gps-new-entity-place={gpsEntityPlace}
      />
      <Ring
        id={entityId}
        color='#fff'
        radiusInner={115}
        radiusOuter={120}
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
        gps-new-entity-place={gpsEntityPlace}
      />
    </>
  );
};

export default Spot;
