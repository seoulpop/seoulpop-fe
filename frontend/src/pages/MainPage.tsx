/** @jsxImportSource @emotion/react */
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import { DEFAULT_MARKER_INFO } from '@/constants/map';
import useMaps from '@/hooks/server/useMap';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import { Z_INDEX } from '@/styles/common';
import { MarkerInfo } from '@/types/marker';
import MainLayout from '@/Layouts/MainLayout';
import { NotificationData } from '@/types/notification';
import BottomPanelArea from '@/containers/Main/BottomPanelArea';
import Navigation from '@/containers/Main/Navigation';
import { Coords, DestinationInfo } from '@/types/location';
import { NOTIFICATION_DATA_KEY } from '@/constants/notification';
import useNotifications from '@/hooks/server/useNotifications';

import TabBar from '@/components/TabBar';
import Button from '@/components/Button';

const KakaoMap = styled(Map)`
  width: 100svw;
  max-width: 480px;
  height: 100svh;
  overflow: hidden;
`;

const CategoryWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  gap: 0.8rem;
  z-index: ${Z_INDEX.float};
`;

const MainPage = () => {
  useKakaoLoader();
  const { lat, lng, error } = useCurrentLocation();
  const { markerData, markerNearbyData } = useMaps(lat, lng);
  const { notificationMutation } = useNotifications();
  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: DEFAULT_MARKER_INFO.lat,
    lng: DEFAULT_MARKER_INFO.lng,
  });
  const [origin, setOrigin] = useState<Coords>({ lat, lng });
  const [destination, setDestination] = useState<DestinationInfo | null>(null);
  const [markerList, setMarkerList] = useState<MarkerInfo[]>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isInit, setIsInit] = useState(false);

  const handleCenterClick = () => {
    setCenter({ lat, lng });
  };

  const handleMapCategoryClick = (index: number) => {
    setSelectedCategory(selectedCategory === index ? 0 : index);
  };

  useEffect(() => {
    if (markerData) setMarkerList(markerData);

    const categoryMap: { [key: number]: string } = {
      1: '문화재',
      2: '3·1운동',
      3: '6·25전쟁',
    };

    const filterMarkers = () => {
      if (selectedCategory === 0) return markerData;
      const category = categoryMap[selectedCategory];
      return markerData?.filter((data) => data.category === category);
    };

    setMarkerList(filterMarkers());
  }, [selectedCategory, markerData]);

  // 알림 클릭으로 진입 시
  useEffect(() => {
    const data = sessionStorage.getItem(NOTIFICATION_DATA_KEY);
    if (data) {
      sessionStorage.removeItem(NOTIFICATION_DATA_KEY);
      const notificationData: NotificationData = JSON.parse(data);
      notificationMutation.mutate(notificationData.notificationId);
      setDestination({
        name: notificationData.historyName,
        category: notificationData.historyCategory,
        lat: notificationData.historyLat,
        lng: notificationData.historyLng,
      });
      setOrigin({ lat, lng });
    }
  }, []);

  // 현재 위치로 초기화
  useEffect(() => {
    if (!isInit && lat !== DEFAULT_MARKER_INFO.lat && lng !== DEFAULT_MARKER_INFO.lng) {
      setCenter({ lat, lng });
      setIsInit(true);
    }
  }, [isInit, lat, lng]);

  if (error) {
    return <div>위치 정보 오류</div>;
  }

  return (
    <MainLayout>
      <KakaoMap
        center={center}
        isPanto
        onCenterChanged={(map) =>
          setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() })
        }
        ref={mapRef}
      >
        {destination && isInit && mapRef.current ? (
          <>
            <Navigation
              map={mapRef.current}
              origin={origin}
              destination={destination}
              setDestination={setDestination}
            />
            <MapMarker
              position={{ lat: destination.lat, lng: destination.lng }}
              image={{
                src: `/assets/images/${destination.category}-false.webp`,
                size: { width: 40, height: 50 },
              }}
            />
          </>
        ) : (
          <>
            <CategoryWrapper>
              <Button
                type='button'
                size='medium'
                onClick={() => handleMapCategoryClick(1)}
                color={selectedCategory === 1 ? 'var(--primary)' : 'var(--white)'}
              >
                <img src='/icons/gyeongbokgung.webp' alt='gyeongbokgung' width={24} height={24} />
                문화재
              </Button>
              <Button
                type='button'
                size='medium'
                onClick={() => handleMapCategoryClick(2)}
                color={selectedCategory === 2 ? 'var(--primary)' : 'var(--white)'}
              >
                <img src='/icons/korean_flag.webp' alt='korean-flag' width={24} height={24} />
                3·1운동
              </Button>
              <Button
                type='button'
                size='medium'
                onClick={() => handleMapCategoryClick(3)}
                color={selectedCategory === 3 ? 'var(--primary)' : 'var(--white)'}
              >
                <img src='/icons/soldier.webp' alt='soldier' width={24} height={24} />
                6·25전쟁
              </Button>
            </CategoryWrapper>
            <BottomPanelArea
              markerNearbyData={markerNearbyData}
              onCenterClick={handleCenterClick}
            />
            <TabBar />
            {markerList === undefined ? (
              <MapMarker
                position={{ lat: DEFAULT_MARKER_INFO.lat, lng: DEFAULT_MARKER_INFO.lng }}
              />
            ) : (
              markerList.map((marker) => (
                <MapMarker
                  position={{ lat: marker.lat, lng: marker.lng }}
                  key={marker.id}
                  image={{
                    src: `/assets/images/${marker.category}-${marker.visited}.webp`,
                    size: { width: 40, height: 50 },
                  }}
                />
              ))
            )}
          </>
        )}

        <MapMarker
          position={{ lat, lng }}
          image={{ src: '/assets/images/currMarker.png', size: { width: 50, height: 50 } }}
        />
      </KakaoMap>
    </MainLayout>
  );
};

export default MainPage;
