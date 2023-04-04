import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';
import { useNavigate } from 'react-router-dom';
import { withdrawalGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useWithdrawalGroup = () => {
  const navigate = useNavigate();
  return useMutation(withdrawalGroup, {
    onSuccess: () => {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.GROUP_WITHDRAWAL });
      navigate('/');
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
