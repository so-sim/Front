import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { message } from './index';
import { deleteGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { ToastPopUp } from '@/common/Toast';

export const useDeleteGroup = () => {
  return useMutation(deleteGroup, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.GROUP_DELETE });
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
