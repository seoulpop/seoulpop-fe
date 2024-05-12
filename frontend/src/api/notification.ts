import { apiUser } from '@/api/index';
import { LocationInfo } from '@/types/notification';

export const postToken = async (fcmToken: string): Promise<string> => {
  const response = await apiUser.post(`/v1/notifications/regist`, { fcmToken });
  return response.data;
};

export const postNotifications = async ({
  memberId = -100,
  lat,
  lng,
}: LocationInfo): Promise<string> => {
  const response = await apiUser.post(`/v1/notifications`, { memberId, lat, lng });
  return response.data;
};
