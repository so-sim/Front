import { updateEvent } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  return useMutation(updateEvent, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
    },
  });
};
