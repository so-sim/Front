import { message } from './index';
import { joinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';

export const useJoinGroup = () => {
  return useMutation(joinGroup, {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
