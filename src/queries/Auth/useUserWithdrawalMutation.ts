import { TOAST_ERROR } from './../../constants/Toast';
import { userWithDrawal } from '@/api/User';
import { ToastPopUp } from '@/components/@common/Toast';
import { GroupListWithIndex } from '@/types/group';
import { removeAccessToken } from '@/utils/acceessToken';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';

const useUserWithdrawalMutation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const queryClient = useQueryClient();
  return useMutation(userWithDrawal, {
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['groupList'] });
      const previousData = queryClient.getQueryData<GroupListWithIndex>(['groupList']);

      if (previousData) {
        queryClient.setQueryData<GroupListWithIndex>(['groupList'], {
          next: false,
          index: 0,
          groupList: [],
        });
      }
      return { previousData };
    },
    onSuccess: async () => {
      removeAccessToken();
      navigate('/');
    },
    onError: (error, value, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['groupList'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['groupList']);
    },
  });
};

export default useUserWithdrawalMutation;
