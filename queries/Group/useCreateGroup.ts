import { useRecoilState } from 'recoil';
import { createGroup } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { firstVisitState } from '@/store/\bfirstVisitState';
import { TOAST_ERROR } from '@/constants/Toast';
import { ToastPopUp } from '@/common/Toast';

export const useCreateGroup = (modalHandler: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_, setIsFirstVisit] = useRecoilState(firstVisitState);

  return useMutation(createGroup, {
    onSuccess: (data) => {
      navigate(`/group/${data.content.groupId}/book`);
      setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: true }));
      modalHandler();
      queryClient.invalidateQueries(['groupList']);
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.NETWORK });
    },
  });
};
