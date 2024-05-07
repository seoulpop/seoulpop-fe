/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { registerPlugin, Capacitor } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation';

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>('BackgroundGeolocation');

export const backgroundGeolocation = () => {
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

        // data fetch
        axios.get(`${import.meta.env.VITE_BASE_URL}/ping`).then((response: any) => {
          console.log(response.data);
        });

        return console.log(location);
      },
    );
  }
};
