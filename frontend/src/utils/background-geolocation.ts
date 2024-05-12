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
      // TODO: 최소 미터 수 늘리기
      distanceFilter: 2,
    },
    // TODO: 타입 지정
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

      // data fetch
      // TODO: location.latitude, location.longitude 전송, 쓰로틀링
      postNotifications({ lat: 37.57, lng: 126.9753598 });

      return console.log(location);
    },
  );
};
