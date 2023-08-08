import { canWithDrawal } from '@/api/User';
import { useQuery } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

interface UseCanWithDrawalProps {
  modalHandler: () => void;
  trigger: boolean;
}

export const useCanWithdrawl = ({ modalHandler, trigger }: UseCanWithDrawalProps) => {
  const navigate = useNavigate();
  return useQuery(['canWithdraw'], canWithDrawal, {
    enabled: !!trigger,
    retry: 0,
    onSuccess: () => {
      if (isMobile) {
        navigate('/m-withdrawal');
        return;
      }
      navigate('/withdrawal');
    },
    onError: () => {
      modalHandler();
    },
  });
};
