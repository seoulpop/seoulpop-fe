import { AssetItem, Assets, Camera, Scene } from '@belivvr/aframe-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import useArMarkers from '@/hooks/server/useArMarkers';

import ArContents from '@/containers/ArDemo/ArContents';
// import CoorDebug from '@/containers/ArDemo/CoorDebug';
import FoundButton from '@/containers/ArDemo/FoundButton';
import GoBackButton from '@/containers/ArDemo/GoBackButton';
import NearMessage from '@/containers/ArDemo/NearMessage';
import Spot from '@/containers/ArDemo/Spot';
import { GeolocationCoordinates, MarkerInfo, Position } from '@/types/ar';
import { getDistanceFromLatLonInMeters } from '@/utils/distance';

interface NearItem {
  marker: MarkerInfo | null;
  distance: number;
}

const SceneContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/** 
// 테스트용 데이터
const MOCK_DATA: MarkerInfo[] = [
  {
    id: -1,
    lng: 127.0875046,
    lat: 37.4712586,
    name: '탑골공원',
    category: '문화재',
    arImage: '/assets/images/test.png',
  },
  {
    id: 2,
    lng: 127.087403,
    lat: 37.4713001,
    name: '경복궁',
    category: '문화재',
    arImage: '/assets/images/test2.png',
  },
  {
    id: -97,
    lat: 37.4717377,
    lng: 127.0880092,
    name: '서울 숭례문 (서울 崇禮門)',
    category: '문화재',
    arImage: '/assets/images/sungnyemunGate.jpeg',
  },
  {
    id: 1,
    lat: 37.55992779,
    lng: 126.9753598,
    name: '서울 숭례문 (서울 崇禮門)',
    category: '문화재',
    arImage: '/assets/images/sungnyemunGate.jpeg',
  },
];
*/

const ArDemo = () => {
  const [position, setPosition] = useState<Position>();
  const [selectItem, setSelectItem] = useState<MarkerInfo>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [nearItem, setNearItem] = useState<MarkerInfo | null>();

  const { markerNearbyData } = useArMarkers({
    lat: position?.latitude,
    lng: position?.longitude,
  });

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
    // 페이지 로드시 현재 좌표값 세팅
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((_position) => {
        setPosition({ latitude: _position.coords.latitude, longitude: _position.coords.longitude });
      });
    }
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
      >
        <Camera
          gps-new-camera='gpsMinDistance: 5;'
          // simulateLatitude: 51.059; simulateLongitude: -0.717'
        />
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

export default ArDemo;
