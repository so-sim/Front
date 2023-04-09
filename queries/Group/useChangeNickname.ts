import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { changeNickname } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types/serverResponse';

interface UseChangeNicknameProps {
  modalHandler: () => void;
  setError: <P extends 'nickname'>(target: P, message: string) => string;
}

export const useChangeNickname = ({ modalHandler, setError }: UseChangeNicknameProps) => {
  return useMutation(changeNickname, {
    onSuccess: () => {
      modalHandler();
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_GROUP });
    },
    onError: (error) => {
      const axiosError = error as unknown as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as ServerResponse;
        setError('nickname', data.status.message);
      } else {
        ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
      }
    },
  });
};
