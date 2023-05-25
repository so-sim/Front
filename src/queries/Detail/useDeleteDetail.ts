import { deleteEvent } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';

export const useDeleteDetail = (onSuccessDelete: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.DELETE_FINE });
      onSuccessDelete();
    },
  });
};
