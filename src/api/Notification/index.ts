import api from '..';
import { ServerResponse } from '@/types/serverResponse';
import { NotificationListWithIndex } from '@/types/notification';

export const reqNotifications = async (): Promise<ServerResponse> => {
  const { data } = await api.post('/api/pay-notifications');
  return data;
};

export const getNotificationList = async (page: number, size: number): Promise<ServerResponse<NotificationListWithIndex>> => {
  const { data } = await api.get(`/api/notification?page=${page}&size=${size}`);

  return data;
};
