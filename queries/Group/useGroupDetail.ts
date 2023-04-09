import { getGroupDetail } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGroupDetail = (groupId: GroupId) => {
  return useQuery(['groupDetail', groupId.groupId], () => getGroupDetail(groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
