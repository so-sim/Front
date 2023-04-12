import { getParticipantList } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useQuery } from '@tanstack/react-query';

export const useParticipantList = (groupId: number | undefined) => {
  return useQuery(['participantList', groupId], () => getParticipantList(groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
