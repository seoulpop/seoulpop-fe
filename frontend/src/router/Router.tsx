import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Root = lazy(() => import('./Root'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const MainPage = lazy(() => import('@/pages/MainPage'));
const ExamplePage = lazy(() => import('@/pages/ExamplePage'));
const ArPage = lazy(() => import('@/pages/ArPage'));
const ArPcPage = lazy(() => import('@/pages/ArPcPage'));
const SettingPage = lazy(() => import('@/pages/SettingPage'));
const CollectionPage = lazy(() => import('@/pages/CollectionPage'));
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
        { path: '/ar', element: <ArPage /> },
        { path: '/ar-pc', element: <ArPcPage /> },
        { path: '/heritage/detail/:historyId', element: <HeritageDetail /> },
        { path: '/site/detail/:historyId', element: <SiteDetail /> },
        { path: '/notifications', element: <NotificationPage /> },
        { path: '/collection', element: <CollectionPage /> },
        { path: '/setting', element: <SettingPage /> },
        { path: '/v1/oauth/redirected/kakao', element: <KakaoCallbackPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
