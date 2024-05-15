import { Circle, Entity, Plane, Ring, Text } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { AR_Z_INDEX } from '@/styles/common';
import { MarkerInfo, Position } from '@/types/ar';
import { formatGpsNewEntityPlace } from '@/utils/ar';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

const DebugUI = styled.div`
  position: fixed;
  z-index: 1;

  width: 200px;
  height: 30px;
  background: #fff;

  font-size: 2rem;
`;

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 3;
const minRadius = centerRadius + 4;
const maxRadius = 6;
const ringDelta = 1;
const duration = 2000;

const Spot = ({
  position,
  visible,
  onClickSpot,
  lng,
  lat,
  hasArContents,
  heritage,
}: {
  position?: Position;
  visible?: boolean;
  lat: number;
  lng: number;
  hasArContents?: boolean;
  heritage: MarkerInfo;
  onClickSpot: (heritageId: number) => void;
}) => {
  const [distance, setDistance] = useState('');
  const [latt, setLat] = useState<number>(); // TODO: 디버깅 후 삭제
  const [lngg, setLng] = useState<number>(); // TODO: 디버깅 후 삭제

  useEffect(() => {
    if (AFRAME.components['spot-click']) return;

    const clickHandler = (heritageId: string) => {
      onClickSpot(Number(heritageId));
    };

    AFRAME.registerComponent('spot-click', {
      init() {
        const { el } = this;
        const { id } = el;
        el.addEventListener('click', () => clickHandler(id));
      },
    });
  }, []);

  useEffect(() => {
    // 현재 좌표와의 거리 계산
    if (!position) return;

    setLat(position.latitude);
    setLng(position.longitude);

    const dist = getDistanceFromLatLonInMeters({
      lat1: position.latitude,
      lon1: position.longitude,
      lat2: lat,
      lon2: lng,
    });

    setDistance(dist?.toFixed(2));
  }, [position]);

  return (
    <>
      <DebugUI>
        {latt} {lngg}
      </DebugUI>

      <Entity
        position={{ x: 0, y: 0, z: AR_Z_INDEX.spot }}
        {...(hasArContents ? { visible } : {})}
        gps-new-entity-place={formatGpsNewEntityPlace({ lat, lng })}
        id={heritage.id.toString()}
        spot-click
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
        />

        {/* 문화재명, 거리 */}
        <Entity position={{ x: 0, y: maxRadius + 5, z: 0 }}>
          <Plane width={1} height={20} color='#fff' />
          <Entity position={{ x: 0, y: 15, z: 0 }}>
            <Text
              id='distance'
              value={`${distance}km`}
              color='#fff'
              scale={{ x: 50, y: 50, z: 50 }}
            />
          </Entity>
        </Entity>
      </Entity>
    </>
  );
};

export default Spot;
