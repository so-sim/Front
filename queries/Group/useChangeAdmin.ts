import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from './../../common/Toast/index';
import { changeAdmin } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ServerResponse } from '@/types/serverResponse';
import { GroupDetail, ParticipantList } from '@/types/group';

interface UseChangeAdimProps {
  groupId: string | undefined;
}

export const useChangeAdmin = ({ groupId }: UseChangeAdimProps) => {
  const queryClient = useQueryClient();
  return useMutation(changeAdmin, {
    onMutate: async (context) => {
      const { groupId, nickname } = context;
      await queryClient.cancelQueries(['participantList', groupId]);
      const prevParticipantList = queryClient.getQueryData<ServerResponse<ParticipantList>>(['particparticipantListipant', { groupId }]);
      const prevGroupDetail = queryClient.getQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId]);

      if (prevParticipantList) {
        queryClient.setQueryData<ServerResponse<ParticipantList>>(['participantList', groupId], {
          ...prevParticipantList,
          content: {
            ...prevParticipantList.content,
            adminNickname: nickname,
          },
        });
      }

      if (prevGroupDetail) {
        queryClient.setQueryData<ServerResponse<GroupDetail>>(['groupDetail', groupId], {
          ...prevGroupDetail,
          content: {
            ...prevGroupDetail.content,
            isAdmin: false,
          },
        });
      }

      return { prevParticipantList, prevGroupDetail };
    },
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_ADMIN });
    },
    onError: (error, value, context) => {
      if (context?.prevParticipantList) {
        queryClient.setQueryData(['participantList', value.groupId], context.prevParticipantList);
      }
      if (context?.prevGroupDetail) {
        queryClient.setQueryData(['groupDetail', value.groupId], context.prevGroupDetail);
      }
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['participantList', groupId]);
      queryClient.invalidateQueries(['groupDetail', groupId]);
    },
  });
};
