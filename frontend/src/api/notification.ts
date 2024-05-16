import { api, apiUser } from '@/api/index';
import { PostNotificationResponse } from '@/types/notification';

export const postToken = async (fcmToken: string): Promise<string> => {
  const response = await apiUser.post(`/v1/notifications/regist`, { fcmToken });
  return response.data;
};

export const postNotifications = async ({
  memberId = -100,
  lat,
  lng,
}: PostNotificationResponse): Promise<string> => {
  const response = await apiUser.post(`/v1/notifications`, { memberId, lat, lng });
  return response.data;
};

export const patchNotifications = async (notificationId: string) => {
  try {
    const response = await api.patch(`/v1/notifications`, { notificationId });
    return response.data;
  } catch (error) {
    console.log('Patch notificationId error: ', error);
    return '';
  }
};

export const getNotifications = async () => {
  try {
    const response = await api.get(`/v1/notifications`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Get notifications error: ', error);
    return [];
  }
};
