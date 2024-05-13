/** @jsxImportSource @emotion/react */
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_MARKER_INFO } from '@/constants/map';
import useMaps from '@/hooks/server/useMap';
import { BORDER_RADIUS, Z_INDEX } from '@/styles/common';
import { MarkerInfo } from '@/types/marker';
import { slideIn, slideOut } from '@/styles/animation';
import { IconCenter, IconDown, IconUp } from '#/svgs';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import MainLayout from '@/Layouts/MainLayout';
import { NOTIFICATION_DATA_KEY } from '@/constants/notification';
import { NotificationData } from '@/types/notification';
import { getCarDirection } from '@/api/directions';
import { CarDirectionData } from '@/types/directions';

import Button from '@/components/Button';
import TabBar from '@/components/TabBar';

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

const carouselStyle = (visible: boolean) => css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${visible ? slideIn : slideOut} 0.5s cubic-bezier(0.86, 0, 0.07, 1) forwards;
  z-index: ${Z_INDEX.float};
`;

const BottomPanelArea = styled.div`
  position: fixed;
  width: 100%;
  bottom: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// TODO: 버튼 공통 컴포넌트로 바꿔야 함
const PanelToggleButtonStyle = css`
  width: 4.8rem;
  height: 4.8rem;
  margin-left: 2rem;
  background-color: var(--white);
  border: none;
  border-radius: ${BORDER_RADIUS.circle};
  box-shadow: var(--shadow);
  cursor: pointer;
`;

// TODO: 버튼 공통 컴포넌트로 바꿔야 함
const CenterLocationButtonStyle = css`
  width: 4.8rem;
  height: 4.8rem;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
  border-radius: ${BORDER_RADIUS.circle};
  box-shadow: var(--shadow);
  cursor: pointer;
`;

const CameraButton = styled(Button)``;

const MainPage = () => {
  useKakaoLoader();
  const navigate = useNavigate();
  const { lat, lng, error } = useCurrentLocation();
  const { markerData, markerNearbyData } = useMaps(lat, lng);
  const mapRef = useRef(null);
  const [center, setCenter] = useState({
    lat: DEFAULT_MARKER_INFO.lat,
    lng: DEFAULT_MARKER_INFO.lng,
  });
  const [destination, setDestination] = useState<{ lat: string; lng: string } | undefined>();
  const [markerList, setMarkerList] = useState<MarkerInfo[]>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isInit, setIsInit] = useState(false);

  const togglePanel = () => {
    console.log(markerNearbyData);
    setIsVisible(!isVisible);
  };

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

  const check = async () => {
    if (destination) {
      console.log('destination: ', destination.lat, destination.lng);
      const data: CarDirectionData = await getCarDirection({
        origin: { lat: center.lat.toString(), lng: center.lng.toString() },
        destination,
      });
      if (data) {
        console.log(center, destination);
        const linePath: kakao.maps.LatLng[] = [];
        data.routes[0].sections[0].roads.forEach((router) => {
          router.vertexes.forEach((_, index) => {
            if (index % 2 === 0) {
              // 경도
              linePath.push(
                new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]),
              );
            }
          });
        });
        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: 'var(--primary)',
          strokeOpacity: 0.8,
          strokeStyle: 'shortdash',
        });
        polyline.setMap(mapRef.current);
      }
    }
  };

  // 경로 안내
  useEffect(() => {
    if (destination && isInit) {
      check();
    }
  }, [isInit, destination]);

  // 알림 클릭으로 진입 시
  useEffect(() => {
    const data = sessionStorage.getItem(NOTIFICATION_DATA_KEY);
    if (data) {
      const notificationData: NotificationData = JSON.parse(data);
      setDestination({
        lat: notificationData.historyLat,
        lng: notificationData.historyLng,
      });
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
          // TODO: debounce 필요
          setCenter({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng() })
        }
        ref={mapRef}
      >
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

        {markerList === undefined ? (
          <MapMarker position={{ lat: DEFAULT_MARKER_INFO.lat, lng: DEFAULT_MARKER_INFO.lng }} />
        ) : (
          markerList.map((marker) => (
            <MapMarker position={{ lat: marker.lat, lng: marker.lng }} key={marker.id} />
          ))
        )}

        <div css={carouselStyle(isVisible)}>
          <BottomPanelArea>
            <button type='button' css={PanelToggleButtonStyle} onClick={togglePanel}>
              {isVisible ? <IconDown /> : <IconUp />}
            </button>
            <CameraButton
              type='button'
              size='large'
              color='var(--primary)'
              // TODO: url 변경
              onClick={() => navigate('/ardemo')}
            >
              <img src='/icons/camera_3d.webp' alt='camera' width={30} height={24} />
              카메라로 찍어보기
            </CameraButton>
            <button type='button' css={CenterLocationButtonStyle} onClick={handleCenterClick}>
              <IconCenter />
            </button>
          </BottomPanelArea>
          <h1>Carousel 영역</h1>
          <p>여기에 하나씩 넣을거에요</p>
        </div>
      </KakaoMap>
      <TabBar />
    </MainLayout>
  );
};

export default MainPage;
