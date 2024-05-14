import { Coords } from '@/types/location';

export interface PostNotificationResponse extends Coords {
  memberId?: number;
}

export interface NotificationData {
  historyName: string;
  historyCategory: string;
  historyLat: number;
  historyLng: number;
}
