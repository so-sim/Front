export interface NotificationListWithIndex {
  hasNext: boolean;
  notificationList: NotificationList[];
}

export type NotificationList = {
  notificationId: number;
  date: string;
  category: string;
  groupTitle: string;
  message: string;
  read: boolean;
};
