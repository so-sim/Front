import { changeNickname } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useChangeNickname = (setErrorText: (error: string) => void) => {
  return useMutation(changeNickname, {
    onError(error: any) {
      setErrorText(error.response.data.filed as string);
    },
  });
};
