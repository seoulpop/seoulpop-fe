import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Root = lazy(() => import('./Root'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const ExamplePage = lazy(() => import('@/pages/ExamplePage'));

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: '/example', element: <ExamplePage /> },
        // { path: '/category/:category', element: <CategoryResultPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
