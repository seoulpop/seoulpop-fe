import { Suspense, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

import Router from '@/router/Router';
import { addBackgroundGeolocationWatcher } from '@/utils/background-geolocation';
import { initFCMListener } from '@/utils/firebase';

const App = () => {
  useEffect(() => {
    if (Capacitor.getPlatform() === 'android') {
      addBackgroundGeolocationWatcher();
      initFCMListener();
    }
  }, []);

  return (
    <Suspense>
      <Router />
    </Suspense>
  );
};

export default App;
