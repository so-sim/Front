import { deleteEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDetail = () => {
  return useMutation(deleteEvent, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.DELETE_FINE });
    },
  });
};
