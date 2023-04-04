import { updateGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { AxiosError } from 'axios';

interface UseUpdateGroupProps {
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

export const useUpdateGroup = ({ setErrorText }: UseUpdateGroupProps) => {
  return useMutation(updateGroup, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_GROUP });
    },
    onError: (error) => {
      const { response } = error as unknown as AxiosError;
      if (response?.data) {
        // setErrorText(response.data.filed as string);
        console.log(response.data);
      }
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
