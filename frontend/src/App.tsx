import { Suspense } from 'react';

import Router from './router/Router';

const App = () => {
  return (
    <Suspense>
      <Router />
    </Suspense>
  );
};

export default App;
