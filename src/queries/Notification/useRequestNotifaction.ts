import { reqNotifications } from '@/api/Notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRequestNotification = (onSuccessRequest?: (data: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation(reqNotifications, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['detailList']);
      onSuccessRequest && onSuccessRequest({ evendId: '1' });
    },
  });
};
