import DefaultLayout from '@/Layouts/DetailLayout';
import Header from '@/components/Header';
import PermissionSlider from '@/components/PermissionSlider';
import TabBar from '@/components/TabBar';
import { HEADER_HEIGHT } from '@/constants/components';
import { FONT_SIZE } from '@/styles/common';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: ${HEADER_HEIGHT}rem 2rem 2rem;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${FONT_SIZE.md};
  }
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

  return (
    <DefaultLayout>
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
      <TabBar />
    </DefaultLayout>
  );
};

export default SettingPage;
