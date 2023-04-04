import { TOAST_ERROR } from './../../constants/Toast';
import { userWithDrawal } from '@/api/User';
import { ToastPopUp } from '@/common/Toast';
import { GroupListWithIndex } from '@/types/group';
import { removeAccessToken } from '@/utils/acceessToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserWithdrawalMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(userWithDrawal, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['groupList'] });
      const previousData = queryClient.getQueryData<GroupListWithIndex>(['groupList']);

      if (previousData) {
        queryClient.setQueryData<GroupListWithIndex>(['groupList'], {
          next: false,
          groupList: [],
        });
      }
      return { previousData };
    },
    onSuccess: async () => {
      removeAccessToken();
      localStorage.removeItem('recoil-persist');
      navigate('/');
    },
    onError: (error, value, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groupList'], context.previousData);
      }
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['groupList']);
    },
  });
};

export default useUserWithdrawalMutation;
