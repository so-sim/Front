import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { message } from './index';
import { changeNickname } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useChangeNickname = (setErrorText: (error: string) => void) => {
  return useMutation(changeNickname, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_GROUP });
    },
    onError(error: any) {
      setErrorText(error.response.data.filed as string);
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
