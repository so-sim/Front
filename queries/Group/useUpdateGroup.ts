import { ServerResponse } from '@/types/serverResponse';
import { updateGroup } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { AxiosError } from 'axios';
import { GroupDetail } from '@/types/group';

interface UseUpdateGroup {
  modalHandler: () => void;
  setError: <P extends 'nickname'>(target: P, message: string) => string;
}

export const useUpdateGroup = ({ modalHandler, setError }: UseUpdateGroup) => {
  const queryClient = useQueryClient();
  return useMutation(updateGroup, {
    onMutate: async ({ groupId, title }) => {
      await queryClient.cancelQueries(['groupList', groupId]);
      const previousData = queryClient.getQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId]);

      if (previousData) {
        queryClient.setQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId], {
          ...previousData,
          content: {
            ...previousData.content,
            title,
          },
        });
      }
      return { previousData };
    },

    onSuccess: () => {
      modalHandler();
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_GROUP });
    },
    onError: (error, value, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groupDetail', value.groupId], context.previousData);
      }
      const axiosError = error as unknown as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as ServerResponse;
        setError('nickname', data.status.message);
      } else {
        ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
      }
    },
    onSettled: (context) => {
      queryClient.invalidateQueries(['groupDetail', context?.content.groupId]);
    },
  });
};
