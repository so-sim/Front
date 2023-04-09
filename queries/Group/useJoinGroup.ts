import { joinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types/serverResponse';

interface UseJoinGroupProps {
  setError: <P extends 'nickname'>(target: P, message: string) => string;
  groupId: number;
}

export const useJoinGroup = ({ setError, groupId }: UseJoinGroupProps) => {
  const navigate = useNavigate();
  return useMutation(joinGroup, {
    onError: (error: any) => {
      const axiosError = error as unknown as AxiosError;
      if (axiosError.response) {
        const data = axiosError.response.data as ServerResponse;
        setError('nickname', data.status.message);
      } else {
        ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
      }
    },
    onSuccess: () => {
      navigate(`/group/${groupId}/book`);
    },
  });
};
