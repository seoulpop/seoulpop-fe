import Header from '@/components/Header';
import styled from '@emotion/styled';
import { HEADER_HEIGHT, TABBAR_HEIGHT } from '@/constants/components';
import { PushNotifications } from '@capacitor/push-notifications';
import { Geolocation } from '@capacitor/geolocation';
import { useEffect, useState } from 'react';
import TabBar from '@/components/TabBar';
import PermissionSlider from '@/components/PermissionSlider';
import { BORDER_RADIUS, FONT_SIZE } from '@/styles/common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: ${HEADER_HEIGHT}rem;
  padding: 2rem;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${FONT_SIZE.md};
  }
`;

const LoginContainer = styled.a`
  position: absolute;
  bottom: ${TABBAR_HEIGHT + 1.6}rem;
  display: block;
  padding: 1.3rem;
  background-color: #fee500;
  left: 5%;
  width: 90%;
  border-radius: ${BORDER_RADIUS.circle};
  text-decoration: none;
  outline: none;
  color: var(--black);
  text-align: center;
  font-size: ${FONT_SIZE.md};
`;

const SettingPage = () => {
  const [pushNotificationPermission, setPushNotificationPermission] = useState(false);
  const [geolocationPermission, setGeolocationPermission] = useState(false);
  const checkPushNotificationPermission = async () => {
    const status = await PushNotifications.checkPermissions();
    if (status.receive !== 'granted') {
      setPushNotificationPermission(false);
    } else {
      setPushNotificationPermission(true);
    }
  };

  const checkGeolocationPermission = async () => {
    const status = await Geolocation.checkPermissions();
    if (status.location !== 'granted') {
      setGeolocationPermission(false);
    } else {
      setGeolocationPermission(true);
    }
  };

  const togglePushNotificationPermission = async () => {
    // TODO: 권한 해제
    if (!pushNotificationPermission) {
      const status = await PushNotifications.requestPermissions();
      if (status.receive === 'granted') {
        setPushNotificationPermission(true);
      }
    }
  };

  const toggleGeolocationPermission = async () => {
    // TODO: 권한 해제
    if (!geolocationPermission) {
      const status = await Geolocation.requestPermissions();
      if (status.location === 'granted') {
        setGeolocationPermission(true);
      }
    }
  };

  useEffect(() => {
    checkPushNotificationPermission();
    checkGeolocationPermission();
  }, []);

  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const loginUri = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <>
      <Header pageName='설정' />
      <Container>
        <div>
          <div>푸시 알림</div>
          <PermissionSlider
            granted={pushNotificationPermission}
            onClick={togglePushNotificationPermission}
            type={'button'}
          />
        </div>
        <div>
          <div>위치 권한</div>
          <PermissionSlider
            granted={geolocationPermission}
            onClick={toggleGeolocationPermission}
            type={'button'}
          />
        </div>
      </Container>
      <LoginContainer href={loginUri}>카카오 로그인</LoginContainer>
      <TabBar />
    </>
  );
};

export default SettingPage;
