import { deleteEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';

export const useDeleteDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.DELETE_FINE });
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
