import { useRecoilState } from 'recoil';
import { createGroup } from '@/api/Group';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { firstVisitState } from '@/store/firstVisitState';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { isMobile } from 'react-device-detect';

export const useCreateGroup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_, setIsFirstVisit] = useRecoilState(firstVisitState);
  const location = useLocation();

  return useMutation(createGroup, {
    onSuccess: (data) => {
      pushDataLayer('create', { route: location.pathname === '/' ? 'main' : 'side' });
      if (isMobile) {
        navigate(`/m-group/${data.content.groupId}/book`);
      } else {
        navigate(`/group/${data.content.groupId}/book`);
      }
      setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: true }));
      queryClient.invalidateQueries(['groupList']);
    },
  });
};
