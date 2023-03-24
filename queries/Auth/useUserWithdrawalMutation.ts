import { userWithDrawal } from '@/api/User';
import { removeAccessToken } from '@/utils/acceessToken';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserWithdrawalMutation = () => {
  const navigate = useNavigate();
  return useMutation(userWithDrawal, {
    onSuccess: () => {
      removeAccessToken();
      navigate('/');
    },
  });
};

export default useUserWithdrawalMutation;
