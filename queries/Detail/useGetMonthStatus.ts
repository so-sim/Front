import { getMonthStatus } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useQuery } from '@tanstack/react-query';

export const useGetMonthStatus = (groupId: string | undefined, year: string, month: string) => {
  return useQuery(['monthStatus', groupId, year, month], () => getMonthStatus(groupId, year, month), {
    enabled: !!groupId,
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
