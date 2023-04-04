import { joinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useNavigate } from 'react-router-dom';

export const useJoinGroup = (setErrorText: (error: string) => void, groupId: number) => {
  const navigate = useNavigate();
  return useMutation(joinGroup, {
    onError(error: any) {
      setErrorText(error.response.data.filed as string);
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
    onSuccess() {
      navigate(`/group/${groupId}/book`);
    },
  });
};
