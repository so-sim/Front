import { updateGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useUpdateGroup = (setErrorText: (error: string) => void) => {
  return useMutation(updateGroup, {
    onError(error: any) {
      setErrorText(error.response.data.filed as string);
    },
  });
};
