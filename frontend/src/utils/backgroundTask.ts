import { Plugins } from '@capacitor/core';

const { BackgroundTask, Geolocation } = Plugins;

export const startBackgroundTask = async () => {
  try {
    // 백그라운드 작업 등록
    console.log('백그라운드 작업 등록');
    await BackgroundTask.register();

    // 백그라운드 작업 설정
    BackgroundTask.beforeExit(async () => {
      const position = await Geolocation.getCurrentPosition();
      // 위치 정보를 서버로 전송하는 작업 등을 수행
      console.log('백그라운드 위치 정보, ', position.coords);
      BackgroundTask.finish(); // 작업 종료
    });

    // 작업 등록 후 백그라운드 실행
    console.log('백그라운드 실행');
    BackgroundTask.start();
  } catch (error) {
    console.error('Error starting background task:', error);
  }
};
