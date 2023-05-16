import { TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/components/@common/Toast';
import { useNavigate } from 'react-router-dom';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { GroupListWithIndex } from '@/types/group';
import { ServerResponse } from '@/types/serverResponse';
import { withdrawalGroup } from '@/api/Group';

export const useWithdrawalGroup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(withdrawalGroup, {
    onMutate: async ({ groupId }) => {
      await queryClient.cancelQueries({ queryKey: ['groupList'] });
      const previousData = queryClient.getQueryData<InfiniteData<ServerResponse<GroupListWithIndex>>>(['groupList']);

      if (previousData) {
        const newData = previousData.pages[0].content.groupList.filter((list) => list.groupId !== groupId);

        queryClient.setQueryData(['groupList'], () => ({
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
    },
    onSettled: () => {
      queryClient.invalidateQueries(['groupList']);
    },
  });
};
