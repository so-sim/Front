import { ServerResponse } from '@/types/serverResponse';
import { updateGroup } from '@/api/Group';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { AxiosError } from 'axios';
import { GroupDetail, GroupListWithIndex, GroupNickname, ParticipantList } from '@/types/group';

interface UseUpdateGroup {
  modalHandler: () => void;
  setError: <P extends 'nickname'>(target: P, message: string) => string;
}

export const useUpdateGroup = ({ modalHandler, setError }: UseUpdateGroup) => {
  const queryClient = useQueryClient();
  return useMutation(updateGroup, {
    onMutate: async ({ groupId, title, nickname }) => {
      await queryClient.cancelQueries(['groupList', groupId]);
      await queryClient.cancelQueries(['myNickname', groupId]);
      await queryClient.cancelQueries(['groupList']);
      await queryClient.cancelQueries(['participantList', groupId]);
      const prevGroupData = queryClient.getQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId]);
      const prevNickname = queryClient.getQueryData<ServerResponse<GroupNickname>>(['myNickname', groupId]);
      const prevParticipantList = queryClient.getQueryData<ServerResponse<ParticipantList>>(['participantList', groupId]);
      const prevGroupList = queryClient.getQueryData<InfiniteData<ServerResponse<GroupListWithIndex>>>(['groupList']);

      if (prevNickname && nickname && prevParticipantList && prevGroupList && prevGroupData) {
        let newData = prevGroupList.pages;
        newData.map((page) => {
          page.content.groupList.map((list) => {
            if (list.groupId === groupId) {
              list.title = title;
            }
          });
        });

        queryClient.setQueryData<InfiniteData<ServerResponse<GroupListWithIndex>>>(['groupList'], {
          ...prevGroupList,
          pages: newData,
          pageParams: [undefined],
        });

        queryClient.setQueryData<ServerResponse<GroupNickname>>(['myNickname', groupId], {
          ...prevNickname,
          content: {
            ...prevNickname.content,
            nickname,
          },
        });

        queryClient.setQueryData<ServerResponse<ParticipantList>>(['participantList', groupId], {
          ...prevParticipantList,
          content: {
            ...prevParticipantList?.content,
            adminNickname: nickname,
          },
        });

        queryClient.setQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId], {
          ...prevGroupData,
          content: {
            ...prevGroupData.content,
            title,
          },
        });
      }

      return { prevGroupList, prevGroupData, prevNickname, prevParticipantList };
    },

    onSuccess: () => {
      modalHandler();
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_GROUP });
    },
    onError: (error, value, context) => {
      if (context?.prevGroupData) {
        queryClient.setQueryData(['groupDetail', value.groupId], context.prevGroupData);
        queryClient.setQueryData(['myNickname', value.groupId], context.prevNickname);
        queryClient.setQueryData(['participantList', value.groupId], context.prevParticipantList);
        queryClient.setQueryData(['groupList'], context.prevGroupList);
      }
      const axiosError = error as unknown as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as ServerResponse;
        setError('nickname', data.status.message);
      }
    },
    onSettled: (context) => {
      queryClient.invalidateQueries(['groupDetail', context?.content.groupId]);
      queryClient.invalidateQueries(['myNickname', context?.content.groupId]);
      queryClient.invalidateQueries(['participantList', context?.content.groupId]);
      queryClient.invalidateQueries(['groupList']);
    },
  });
};
