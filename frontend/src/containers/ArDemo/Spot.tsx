import { Circle, Entity, Plane, Ring, Text } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import HERITAGE_FONT from '@/constants/msdfs';

import HeritageName from '@/containers/ArDemo/HeritageName';
import { AR_Z_INDEX, BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';
import { MarkerInfo, Position } from '@/types/ar';
import { formatGpsNewEntityPlace } from '@/utils/ar';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

const NearMessage = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.float};
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);

  padding: 1rem 2rem;
  width: fit-content;
  border-radius: ${BORDER_RADIUS.circle};

  background: var(--black);
  opacity: 0.5;

  text-align: center;
  font-size: ${FONT_SIZE.md};
  color: var(--white);
`;

const loopInfinity = 10000; // XXX: true가 먹지 않음
const centerRadius = 1;
const minRadius = centerRadius + 1.5;
const maxRadius = minRadius + 1;
const ringDelta = 0.5;
const duration = 2000;

const minDistance = 0.06;

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
  const [isNear, setIsNear] = useState(false);

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

    const dist = getDistanceFromLatLonInMeters({
      lat1: position.latitude,
      lon1: position.longitude,
      lat2: lat,
      lon2: lng,
    });

    console.log(dist, heritage.name);

    if (dist < minDistance) setIsNear(true);
    else setIsNear(false);

    setDistance(dist?.toFixed(2));
  }, [position]);

  const hasFontFile = heritage.id in HERITAGE_FONT;

  return (
    <>
      {/* TODO: 이,가 */}
      {isNear && <NearMessage> {heritage.name}이 가까운 곳에 있습니다! </NearMessage>}
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
                <HeritageName name={heritage.name} font={HERITAGE_FONT[heritage.id]} />
              </Entity>
            )}
          </Entity>
        </Entity>
      </Entity>
    </>
  );
};

export default Spot;
