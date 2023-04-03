import { createEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateDetail = () => {
  return useMutation(createEvent, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.CREATE_FINE });
    },
  });
};
