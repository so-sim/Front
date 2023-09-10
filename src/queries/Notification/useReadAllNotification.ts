import { readAllNotification } from '@/api/Notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReadAllNotification = (onSuccessRequest?: (data: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation(readAllNotification, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['alarmList']);
      queryClient.invalidateQueries(['notificationCount']);
    },
  });
};
