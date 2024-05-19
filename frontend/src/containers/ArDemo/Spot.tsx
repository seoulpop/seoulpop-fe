import { Circle, Entity, Plane, Ring, Text } from '@belivvr/aframe-react';
import { useEffect, useState } from 'react';

import HERITAGE_FONT from '@/constants/msdfs';

import HeritageName from '@/containers/ArDemo/HeritageName';
import { AR_Z_INDEX } from '@/styles/common';
import { MarkerInfo, Position } from '@/types/ar';
import { formatGpsNewEntityPlace } from '@/utils/ar';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 1;
const minRadius = centerRadius + 1.5;
const maxRadius = minRadius + 1;
const ringDelta = 0.5;
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

    // eslint-disable-next-line consistent-return
    return () => {
      delete AFRAME.components[`spot-click`];
    };
  }, []);

  useEffect(() => {
    // 현재 좌표와의 거리 계산
    if (!position) return;

    const dist = getDistanceFromLatLonInMeters({
      lat1: position.latitude,
      lon1: position.longitude,
      lat2: lat,
      lon2: lng,
    });

    setDistance(dist?.toFixed(2));
  }, [position]);

  const hasFontFile = heritage.id in HERITAGE_FONT;

  return (
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
      <Entity position={{ x: 0, y: maxRadius, z: 0 }}>
        <Plane width={0.5} height={8} color='#fff' />
        <Entity position={{ x: 0, y: 6, z: 0 }}>
          <Text
            id='distance'
            value={`${distance}km`}
            color='#fff'
            scale={{ x: 20, y: 20, z: 20 }}
          />
          {hasFontFile && (
            <Entity position={{ x: 0, y: 6, z: 0 }}>
              <HeritageName
                name={HERITAGE_FONT[heritage.id].text}
                font={HERITAGE_FONT[heritage.id].src}
              />
            </Entity>
          )}
        </Entity>
      </Entity>
    </Entity>
  );
};

export default Spot;
