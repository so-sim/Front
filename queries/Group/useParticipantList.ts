import { getParticipantList } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useParticipantList = (groupId: GroupId) => {
  return useQuery(['participantList', groupId], () => getParticipantList(groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
