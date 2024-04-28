import { Suspense, useEffect } from 'react';

import Router from './router/Router';
import { startBackgroundTask } from './utils/backgroundTask';

const App = () => {
  useEffect(() => {
    startBackgroundTask();
  }, []);

  return (
    <Suspense>
      <Router />
    </Suspense>
  );
};

export default App;
