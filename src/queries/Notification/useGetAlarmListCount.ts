import { getNotificationListCount } from '@/api/Notification';
import { useQuery } from '@tanstack/react-query';

export const useGetAlarmListCount = () => {
  return useQuery(['notificationCount'], () => getNotificationListCount());
};
