import { message } from './index';
import { joinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useJoinGroup = (setErrorText: (error: string) => void, groupId: number) => {
  const navigate = useNavigate();
  return useMutation(joinGroup, {
    onError(error: any) {
      setErrorText(error.response.data.filed as string);
    },
    onSuccess() {
      navigate(`/group/${groupId}/book`);
    },
  });
};
