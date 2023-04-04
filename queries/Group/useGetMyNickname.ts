import { getMyNickname } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGetMyNikname = (groupId: GroupId) => {
  return useQuery(['myNickname', groupId], () => getMyNickname(groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
