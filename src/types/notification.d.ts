export interface NotificationData {
  notificationId: string;
  historyName: string;
  historyCategory: string;
  historyLat: number;
  historyLng: number;
}

interface Notification {
  notificationId: string;
  historyId: number;
  historyName: 'string';
  historyCategory: 'string';
  historyLat: number;
  historyLng: number;
  title: string;
  body: string;
  checked: boolean;
}

export type NotificationsData = Notification[];
