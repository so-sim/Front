import { rejoinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const useRejoinGroup = (groupId: number) => {
  const navigate = useNavigate();
  return useMutation(['rejoinGroup', groupId], () => rejoinGroup(groupId), {
    onSuccess: () => {
      if (isMobile) {
        return navigate(`/m-group/${groupId}/book`);
      }
      return navigate(`/group/${groupId}/book`);
    },
  });
};

export default useRejoinGroup;
