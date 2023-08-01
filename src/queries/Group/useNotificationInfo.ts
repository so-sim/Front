import { getNotificationInfo } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useNotificationInfo = (groupId: number) => {
  return useQuery(['notification', groupId], () => getNotificationInfo(groupId));
};
