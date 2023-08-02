import { ServerResponse } from './../../types/serverResponse.d';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { deleteGroup } from '@/api/Group';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastPopUp } from '@/components/@common/Toast';
import { useNavigate } from 'react-router-dom';
import { GroupListWithIndex } from '@/types/group';

export const useDeleteGroup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(deleteGroup, {
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
      navigate('/');
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.GROUP_DELETE });
    },

    onSettled: () => {
      queryClient.invalidateQueries(['groupList']);
    },
  });
};
