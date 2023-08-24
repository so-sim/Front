export interface NotificationListWithIndex {
  hasNext: boolean;
  notificationResponseList: NotificationList[];
}

export type SituationStatus = 'FULL' | 'NONE' | 'CHECK';

export type NotificationType = 'PAYMENT_DATE' | 'REQUEST_PAYMENT' | 'CHANGE_ADMIN' | `CHANGE_${SituationStatus}_SITUATION`;

export type MessageData = {
  amount: number;
  beforeSituation: null | SituationStatus;
  afterSituation: null | SituationStatus;
  nickname: string;
};

export type NotificationList = {
  category: string;
  date: string;
  eventIdList: number[];
  notificationId: number;
  groupId: number;
  groupTitle: string;
  messageData: MessageData;
  summary: string;
  type: NotificationType;
  view: false;
};
