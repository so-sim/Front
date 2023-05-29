import { getGroupDetail } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useGroupDetail = (groupId: number | undefined) => {
  return useQuery(['groupDetail', groupId], () => getGroupDetail(groupId));
};
