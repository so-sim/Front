import { updateEventStatus } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetailStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
