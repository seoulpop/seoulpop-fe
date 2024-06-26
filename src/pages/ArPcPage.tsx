import { AssetItem, Assets, Camera, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import ArContents from '@/containers/Ar/ArContents';
// import CoorDebug from '@/containers/Ar/CoorDebug';
import FoundButton from '@/containers/Ar/FoundButton';
import GoBackButton from '@/containers/Ar/GoBackButton';
import NearMessage from '@/containers/Ar/NearMessage';
import Spot from '@/containers/Ar/Spot';
import { BORDER_RADIUS, FONT_SIZE } from '@/styles/common';
import { GeolocationCoordinates, MarkerInfo, Position } from '@/types/ar';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

interface NearItem {
  marker: MarkerInfo | null;
  distance: number;
}

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;

  .a-dialog-message {
    padding: 0 0.5rem;
    color: var(--black);
    font-size: ${FONT_SIZE.md};
  }

  .a-dialog-allow-button {
    border-radius: ${BORDER_RADIUS.md};

    background-color: var(--primary);
    color: var(--white);
  }

  .a-dialog-deny-button {
    border-radius: ${BORDER_RADIUS.md};

    box-shadow: 0 0 0 1px var(--primary);
    background-color: var(--white);
    color: var(--primary);
  }
`;

// 테스트용 데이터
const MOCK_DATA: MarkerInfo[] = [
  {
    id: 1,
    lng: -0.7165,
    lat: 51.0595,
    name: '숭례문',
    category: '문화재',
    arImage: '/assets/images/sungnyemunGate.jpeg',
  },
];

const deviceMotionMessage = `<p class='a-dialog-message'>ar기능을 사용하기 위해 기기의 방향을 감지할 수 있는 권한을 허용해주세요.</p>`;

const ArPcPage = () => {
  const [position, setPosition] = useState<Position>();
  const [selectItem, setSelectItem] = useState<MarkerInfo>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [nearItem, setNearItem] = useState<MarkerInfo | null>();

  const markerNearbyData = MOCK_DATA;

  useEffect(() => {
    const onUpdateGps = (event: unknown) => {
      // TODO: 위치 업데이트 최적화
      const geolocationCoordinates = event as GeolocationCoordinates;
      const { position: pos } = geolocationCoordinates.detail;
      setPosition(pos);
    };

    document.addEventListener('gps-camera-update-position', onUpdateGps);

    return () => {
      document.removeEventListener('gps-camera-update-positon', onUpdateGps);
    };
  }, []);

  useEffect(() => {
    return () => {
      // aframe에 의한 클래스 스타일 제거
      document.querySelector('html').classList.remove('a-fullscreen');
    };
  }, []);

  useEffect(() => {
    // 가장 가까운 지점 계산
    if (!position || !markerNearbyData) return;

    const minDistance = 0.06;

    const near: MarkerInfo | null = markerNearbyData.reduce<NearItem>(
      (closest, marker) => {
        const distance = getDistanceFromLatLonInMeters({
          lat1: position.latitude,
          lon1: position.longitude,
          lat2: marker.lat,
          lon2: marker.lng,
        });

        if (distance > minDistance) return closest;

        if (distance < closest.distance) {
          return { marker, distance };
        }
        return closest;
      },
      { marker: null, distance: Infinity },
    ).marker;

    setNearItem(near);
  }, [markerNearbyData, position]);

  // TODO: 문화재가 없는 경우 UI
  return (
    <SceneContainer>
      {/* <CoorDebug lat={position?.latitude} lng={position?.longitude} /> */}

      {/* TODO: 이,가 */}
      {nearItem && <NearMessage> {nearItem?.name}이 가까운 곳에 있습니다! </NearMessage>}

      <GoBackButton />
      <FoundButton isOpen={isOpen} heritage={selectItem} />
      <Scene
        vr-mode-ui='enabled: false'
        cursor='rayOrigin: mouse'
        raycaster='near: 0; far: 50000'
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false;'
        renderer={{ antialias: true, alpha: true }}
        device-orientation-permission-ui={`deviceMotionMessage: ${deviceMotionMessage}; allowButtonText: 허용; denyButtonText: 허용 안함;`}
        embedded
      >
        <Camera gps-new-camera='gpsMinDistance: 5; simulateLatitude: 51.0593; simulateLongitude: -0.7165' />
        <Assets>
          {/** XXX: 아래 코드 삭제하지 마세요. 삭제시 spot과의 거리가 보이지 않음 */}
          <AssetItem id='' src='' />
        </Assets>

        {markerNearbyData &&
          markerNearbyData?.length > 0 &&
          markerNearbyData?.map((heritage) => {
            const { id, lat, lng, arImage } = heritage;
            return (
              <Spot
                key={id}
                visible={!isOpen}
                lat={lat}
                lng={lng}
                heritage={heritage}
                onClickSpot={(heritageId) => {
                  setIsOpen(true);
                  setSelectItem(markerNearbyData.find((data) => data.id === heritageId));
                }}
                position={position}
                hasArContents={!!arImage}
              />
            );
          })}
        {/** TODO: 50미터 이내에서만 컨텐츠 확인 가능 */}
        <ArContents
          isOpen={isOpen}
          lat={selectItem?.lat}
          lng={selectItem?.lng}
          arImage={selectItem?.arImage}
          onClose={() => setIsOpen(false)}
        />
      </Scene>
    </SceneContainer>
  );
};

export default ArPcPage;
