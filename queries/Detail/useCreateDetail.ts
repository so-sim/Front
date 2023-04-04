import { TOAST_ERROR } from './../../constants/Toast';
import { createEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailList']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.CREATE_FINE });
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
