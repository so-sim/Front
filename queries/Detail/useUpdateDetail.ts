import { updateEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
    },
  });
};
