import { getMyNickname } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useQuery } from '@tanstack/react-query';

export const useGetMyNikname = (groupId: number | undefined) => {
  return useQuery(['myNickname', groupId], () => getMyNickname(groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
