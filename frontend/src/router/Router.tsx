import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Root = lazy(() => import('./Root'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const ExamplePage = lazy(() => import('@/pages/ExamplePage'));
const ArDemo = lazy(() => import('@/pages/ArDemoPage')); // ar 테스트 후 삭제 예정
const SettingPage = lazy(() => import('@/pages/SettingPage'));
const NotificationPage = lazy(() => import('@/pages/NotificationPage'));
const SiteDetail = lazy(() => import('@/pages/SiteDetail'));
const HeritageDetail = lazy(() => import('@/pages/HeritageDetail'));
const KakaoCallbackPage = lazy(() => import('@/pages/KakaoCallbackPage'));

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
        { path: '/v1/oauth/redirected/kakao', element: <KakaoCallbackPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
