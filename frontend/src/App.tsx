import { Suspense, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

import withSplashScreen from '@/components/SplashScreen';

import Router from '@/router/Router';
import { addBackgroundGeolocationWatcher } from '@/utils/background-geolocation';
import { initFCMListener } from '@/utils/firebase';
import { initAppListenr } from './utils/auth';

const App = () => {
  useEffect(() => {
    if (Capacitor.getPlatform() === 'android') {
      addBackgroundGeolocationWatcher();
      initFCMListener();
      initAppListenr();
    }
  }, []);

  return (
    <Suspense>
      <Router />
    </Suspense>
  );
};

export default withSplashScreen(App);
