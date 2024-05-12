import { Circle, Entity, Plane, Ring } from '@belivvr/aframe-react';
import { useEffect, useState } from 'react';

import { AR_Z_INDEX } from '@/styles/common';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

const formatGpsNewEntityPlace = ({ lat, lng }: { lat: number; lng: number }) =>
  `latitude: ${lat}; longitude: ${lng}`;

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 60;
const minRadius = centerRadius + 30;
const maxRadius = 120;
const ringDelta = 5;
const duration = 2000;

const Spot = ({
  visible,
  onClickSpot,
  lat = 51.0596, // fake gps
  lng = -0.717,
}: {
  visible?: boolean;
  lat?: number;
  lng?: number;
  onClickSpot: () => void;
}) => {
  const [distance, setDistance] = useState<number>();

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
    if (el) el.setAttribute('text', 'value', `${distance}m`); // setAttribute('material', 'color', 'red') https://aframe.io/docs/1.5.0/core/component.html
  }, [distance]);

  useEffect(() => {
    // 가까운 문화재, 역사를 포착
    const onObserveTarget = (event: unknown) => {
      const data = event as GeolocationCoordinates;
      const { position: curPos } = data.detail;

      console.log('curPos', curPos);

      const dist = getDistanceFromLatLonInMeters({
        lat1: curPos.latitude,
        lon1: curPos.longitude,
        lat2: lat,
        lon2: lng,
      });

      setDistance(dist);
      console.log(dist);
    };

    document.addEventListener('gps-camera-update-position', onObserveTarget);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onObserveTarget);
    };
  }, []);

  return (
    <Entity
      position={{ x: 0, y: 0, z: AR_Z_INDEX.spot }}
      visible={visible}
      gps-new-entity-place={formatGpsNewEntityPlace({ lat, lng })}
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
