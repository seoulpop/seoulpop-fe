import { Circle, Entity, Plane } from '@belivvr/aframe-react';

import { AR_Z_INDEX } from '@/styles/common';

const gpsEntityPlace = 'latitude: 51.0596; longitude: -0.7170'; // fake gps
const duration = 200;

const RoundedPlane = ({ isActive = false }: { isActive?: boolean }) => {
  if (!isActive) return null;

  return (
    <Entity
      gps-new-entity-place={gpsEntityPlace}
      position={{ x: 0, y: 0, z: AR_Z_INDEX.contents }}
      animation__scale={{
        property: 'scale',
        from: '0.8 0.8 0.8',
        to: '1 1 1',
        dur: duration,
      }}
    >
      <Plane
        color='#ccc'
        height={2000}
        width={2000}
        position={{ x: 0, y: 0, z: 0 }}
        src='/assets/images/test.png'
      />
      <Circle color='#fff' radius={100} position={{ x: 1000 - 80, y: 1000 - 70, z: 100 }} />
    </Entity>
  );
};

export default RoundedPlane;
