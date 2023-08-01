import api from '..';
import { ServerResponse } from '@/types/serverResponse';

export const reqNotifications = async (): Promise<ServerResponse> => {
  const { data } = await api.post('/api/pay-notifications');
  return data;
};
