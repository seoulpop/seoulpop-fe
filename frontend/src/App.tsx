import { Suspense, useEffect } from 'react';

import Router from './router/Router';
import { backgroundGeolocation } from './utils/background-geolocation';

const App = () => {
  useEffect(() => {
    backgroundGeolocation();
  }, []);

  return (
    <Suspense>
      <Router />
    </Suspense>
  );
};

export default App;
