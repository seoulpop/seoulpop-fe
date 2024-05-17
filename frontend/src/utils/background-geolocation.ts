/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: any 타입 제거
import { registerPlugin } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation';

import { postNotifications } from '@/api/notification';

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>('BackgroundGeolocation');

export const addBackgroundGeolocationWatcher = () => {
  BackgroundGeolocation.addWatcher(
    {
      backgroundMessage: '눌러서 흔적 찾기',
      backgroundTitle: '내 주위의 역사 흔적을 찾고 있어요.',
      requestPermissions: true,
      stale: false,
      // 다음 위치와의 최소 미터 수 (default value: 0)
      distanceFilter: 100,
    },
    // TODO: 타입 지정
    (location: any, error: any) => {
      if (error) {
        if (error.code === 'NOT_AUTHORIZED') {
          if (window.confirm('이 서비스는 위치 권한이 필요합니다.\n설정으로 이동하시겠습니까?')) {
            // 위치 권한이 거부되었을 때, 사용자가 장치의 설정으로 이동할 수 있도록 함
            BackgroundGeolocation.openSettings();
          }
        }
        return console.error(error);
      }

      // data fetch
      // postNotifications({ lat: location.latitude, lng: location.longitude });
      postNotifications({ lat: 37.592106, lng: 126.6737845 });

      return console.log(location);
    },
  );
};
