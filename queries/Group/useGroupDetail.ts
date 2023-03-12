import { getGroupDetail, GroupDetail } from '@/api/Group';
import { ServerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGroupDetail = (groupId: string) => {
  return useQuery<ServerResponse<GroupDetail>>(['groupDetail', groupId], () => getGroupDetail(groupId));
};
