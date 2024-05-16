import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import SiteDetail from '@/pages/SiteDetail';
import HeritageDetail from '@/pages/HeritageDetail';
import NotificationPage from '@/pages/NotificationPage';

const Root = lazy(() => import('./Root'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const ExamplePage = lazy(() => import('@/pages/ExamplePage'));
const ArDemo = lazy(() => import('@/pages/ArDemoPage')); // ar 테스트 후 삭제 예정
const SettingPage = lazy(() => import('@/pages/SettingPage'));
const SigninPage = lazy(() => import('@/pages/SigninPage'));

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: '/example', element: <ExamplePage /> },
        { path: '/ardemo', element: <ArDemo /> },
        { path: '/heritage/detail/:historyId', element: <HeritageDetail /> },
        { path: '/site/detail/:historyId', element: <SiteDetail /> },
        { path: '/notifications', element: <NotificationPage /> },
        { path: '/setting', element: <SettingPage /> },
        { path: '/signin', element: <SigninPage /> },
        // { path: '/category/:category', element: <CategoryResultPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
