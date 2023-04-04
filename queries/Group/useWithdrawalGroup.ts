import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { useNavigate } from 'react-router-dom';
import { withdrawalGroup } from '@/api/Group';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupListWithIndex } from '@/types/group';
import { ServerResponse } from '@/types/serverResponse';

export const useWithdrawalGroup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(withdrawalGroup, {
    onMutate: async ({ groupId }) => {
      await queryClient.cancelQueries({ queryKey: ['groupList'] });
      const previousData = queryClient.getQueryData<InfiniteData<ServerResponse<GroupListWithIndex>>>(['groupList']);

      if (previousData) {
        const newData = previousData.pages[0].content.groupList.filter((list) => list.groupId !== groupId);

        queryClient.setQueryData(['groupList'], (data) => ({
          ...previousData,
          pages: newData,
          pageParams: [undefined],
        }));
      }
      return { previousData };
    },

    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.GROUP_WITHDRAWAL });
      navigate('/');
    },
    onError: (error, value, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groupList'], context.previousData);
      }
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['groupList']);
    },
  });
};
