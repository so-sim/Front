import { updateEventStatus } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetailStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
    },
  });
};
