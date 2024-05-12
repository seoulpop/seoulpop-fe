import { Circle, Entity, Ring, Text } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { AR_Z_INDEX } from '@/styles/common';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

const DebugUI = styled.div`
  position: fixed;
  z-index: 1;

  width: 200px;
  height: 30px;
  background: #fff;

  font-size: 2rem;
`;

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
  // lat = 127.0877293, // fake gps
  // lng = 37.4714395,
}: {
  visible?: boolean;
  lat?: number;
  lng?: number;
  onClickSpot: () => void;
}) => {
  const [distance, setDistance] = useState('');
  const [latt, setLat] = useState<number>();
  const [lngg, setLng] = useState<number>();

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
    if (el) el.setAttribute('text', 'value', `${distance}km`); // setAttribute('material', 'color', 'red') https://aframe.io/docs/1.5.0/core/component.html
  }, [distance]);

  useEffect(() => {
    // 가까운 문화재, 역사를 포착
    const onObserveTarget = (event: unknown) => {
      const data = event as GeolocationCoordinates;
      const { position: curPos } = data.detail;

      console.log(curPos, lat, lng);
      setLat(curPos.latitude);
      setLng(curPos.longitude);

      console.log('curPㄴㄴos', curPos, lat, lng);

      const dist = getDistanceFromLatLonInMeters({
        lat1: curPos.latitude,
        lon1: curPos.longitude,
        lat2: lat,
        lon2: lng,
      });

      setDistance(dist?.toFixed(2));
      console.log(dist);
    };

    document.addEventListener('gps-camera-update-position', onObserveTarget);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onObserveTarget);
    };
  }, []);

  return (
    <>
      <DebugUI>
        {latt} {lngg}
      </DebugUI>
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
          <Text id='distance' value='' color='#fff' scale={{ x: 500, y: 500, z: 500 }} />
        </Entity>
      </Entity>
    </>
  );
};

export default Spot;
