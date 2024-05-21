import { apiUser } from '@/api/index';
import { Coords } from '@/types/location';

export const postToken = async (fcmToken: string): Promise<string> => {
  const response = await apiUser.post(`/v1/notifications/regist`, { fcmToken });
  return response.data;
};

export const postNotifications = async ({ lat, lng }: Coords): Promise<string> => {
  const response = await apiUser.post(`/v1/notifications/send`, { lat, lng });
  return response.data;
};

export const patchNotifications = async (notificationId: string) => {
  try {
    const response = await apiUser.patch(`/v1/notifications`, { notificationId });
    return response.data;
  } catch (error) {
    console.log('Patch notificationId error: ', error);
    return '';
  }
};

export const getNotifications = async () => {
  try {
    const response = await apiUser.get(`/v1/notifications`);
    return response.data;
  } catch (error: any) {
    console.log(
      'Get notifications error: ',
      error.response.data.httpStatus,
      error.response.data.errorMsg,
    );
    return [];
  }
};
