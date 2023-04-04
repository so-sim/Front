import { useRecoilState } from 'recoil';
import { message } from './index';
import { createGroup } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { firstVisitState } from '@/store/\bfirstVisitState';

export const useCreateGroup = (modalHandler: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_, setIsFirstVisit] = useRecoilState(firstVisitState);

  return useMutation(createGroup, {
    onSuccess(data) {
      navigate(`/group/${data.content.groupId}/book`);
      setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: true }));
      modalHandler();
      queryClient.invalidateQueries(['groupList']);
    },
  });
};
