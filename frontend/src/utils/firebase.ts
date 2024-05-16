import { PushNotifications } from '@capacitor/push-notifications';

import { postToken } from '@/api/notification';
import { NotificationData } from '@/types/notification';
import { NOTIFICATION_DATA_KEY } from '@/constants/notification';

export const initFCMListener = async () => {
  let permStatus = await PushNotifications.checkPermissions();
  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }
  if (permStatus.receive === 'granted') {
    await PushNotifications.register();
    await PushNotifications.addListener('registration', async (token) => {
      postToken(token.value);
    });
    await PushNotifications.addListener('registration', (tkn) => {
      console.log(`Registration token: ${tkn.value}`);
    });
    await PushNotifications.addListener('registrationError', (err) => {
      console.log(`Registration error: ${err.error}`);
    });
    // notification을 클릭했을 때 실행되는 listener
    await PushNotifications.addListener('pushNotificationActionPerformed', async (notification) => {
      const { notificationId, historyCategory, historyName, historyLat, historyLng } =
        notification.notification.data;
      const data: NotificationData = {
        notificationId,
        historyCategory,
        historyName,
        historyLat,
        historyLng,
      };
      try {
        sessionStorage.setItem(NOTIFICATION_DATA_KEY, JSON.stringify(data));
        window.location.href = '/';
      } catch (error) {
        console.log('Patch notificationId error: ', error);
        window.location.href = '/';
      }
    });
  } else {
    console.log('User denied permissions!');
  }
};
