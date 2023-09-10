import { readNotification } from '@/api/Notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReadNotification = (onSuccessRequest?: (data: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation(readNotification, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['alarmList']);
      queryClient.invalidateQueries(['notificationCount']);
    },
  });
};
