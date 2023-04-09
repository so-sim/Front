import { ServerResponse } from '@/types/serverResponse';
import { updateGroup } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { AxiosError } from 'axios';
import { GroupDetail } from '@/types/group';

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation(updateGroup, {
    onMutate: async ({ groupId, title }) => {
      await queryClient.cancelQueries(['groupList', groupId]);
      const previousData = queryClient.getQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId]);

      console.log(previousData);
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

    onSuccess: () => {},
    onError: (error, value, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groupDetail', value.groupId], context.previousData);
      }
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
    onSettled: (context) => {
      queryClient.invalidateQueries(['groupDetail', context?.content.groupId]);
    },
  });
};
