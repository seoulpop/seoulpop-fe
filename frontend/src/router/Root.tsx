import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

// import useMediaQuery from '@/hooks/useMediaQuery';

// import NavBar from '@/components/NavBar';
import { registerPlugin, Capacitor } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation';
import { Z_INDEX } from '@/styles/common';
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>('BackgroundGeolocation');

const WatcherInfo = styled.div`
  z-index: ${Z_INDEX.float};
  background-color: var(--white);
`;

const Root = () => {
  // const { isMobile } = useMediaQuery();
  const [location, setLocation] = useState<any>();
  const [pong, setPong] = useState<any>('yet');

  useEffect(() => {
    if (Capacitor.getPlatform() === 'android') {
      // addWatcher()로 watcher 추가
      // watcher는 watcher를 제거하는데 필요한 id를 담은 promise를 반환
      // 여러개의 watcher를 추가할 수 있음
      BackgroundGeolocation.addWatcher(
        {
          // backgroundMessage가 정의되어야 background에서도 location을 추적함
          backgroundMessage: '흔적이 발견되었습니다.',
          backgroundTitle: '문화재 찍어보기',

          // 사용자에게 권한 요청 여부
          requestPermissions: true,

          // false인 경우 항상 최신 상태임이 보장되고, true인 경우 이전 위치가 전송될 수 있음
          stale: false,

          // 다음 위치와의 최소 미터 수 (default value: 0)
          distanceFilter: 1,
        },
        (location: any, error: any) => {
          if (error) {
            if (error.code === 'NOT_AUTHORIZED') {
              if (
                window.confirm(
                  'This app needs your location, ' +
                    'but does not have permission.\n\n' +
                    'Open settings now?',
                )
              ) {
                // 위치 권한이 거부되었을 때, 사용자가 장치의 설정으로 이동할 수 있도록 함
                BackgroundGeolocation.openSettings();
              }
            }
            return console.error(error);
          }

          setLocation(JSON.stringify(location.latitude, location.longitude));
          // data fetch
          console.log('data fetch...');
          axios.get(`${import.meta.env.VITE_BASE_URL}/ping`).then((response: any) => {
            console.log(response.data);
            setPong(response.data);
          });

          return console.log(location);
        },
      );
    }
  }, []);

  return (
    <>
      <>
        <WatcherInfo>
          <>location: {location}</>
          <>pong: {pong}</>
        </WatcherInfo>
        <Outlet />
        {/* {isMobile && <NavBar isHide={isListShowed && scrollDirection.y === 'down'} />} */}
      </>
      {/* <Modal portalElementId='portal' isBottom={isMobile} blockScrollOnMount /> */}
    </>
  );
};

export default Root;
