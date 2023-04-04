import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from './../../common/Toast/index';
import { changeAdmin } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useChangeAdmin = () => {
  return useMutation(changeAdmin, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_ADMIN });
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
