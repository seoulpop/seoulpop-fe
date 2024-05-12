import { PushNotifications } from '@capacitor/push-notifications';

import { postToken } from '@/api/notification';

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
      // TODO: id로 notification 식별 가능한지 체크
      console.log(
        `Push notification action performed ${JSON.stringify(notification.notification)}`,
      );
      // 나머지 notification 모두 삭제
      await PushNotifications.removeAllDeliveredNotifications();
    });
  } else {
    console.log('User denied permissions!');
  }
};
