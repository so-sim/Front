import { getGroupDetail } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useGroupDetail = (groupId: number | undefined) => {
  return useQuery(['groupDetail', groupId], () => getGroupDetail(groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
