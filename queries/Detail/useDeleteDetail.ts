import { deleteEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.DELETE_FINE });
    },
  });
};
