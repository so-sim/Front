import { getGroupDetail } from '@/api/Group';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGroupDetail = (groupId: GroupId) => {
  return useQuery(['groupDetail', groupId], () => getGroupDetail(groupId));
};
