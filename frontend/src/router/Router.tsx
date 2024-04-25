import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Root = lazy(() => import('./Root'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const ExamplePage = lazy(() => import('@/pages/ExamplePage'));
const ArDemo = lazy(() => import('@/pages/ArDemo')); // ar 테스트 후 삭제 예정

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
    {
      path: '/ardemo',
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [{ index: true, element: <ArDemo /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
