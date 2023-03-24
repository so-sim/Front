import { useNavigate } from 'react-router-dom';
import { withdrawalGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useWithdrawalGroup = () => {
  const navigate = useNavigate();
  return useMutation(withdrawalGroup, {
    onSuccess: () => {
      navigate('/');
    },
  });
};
