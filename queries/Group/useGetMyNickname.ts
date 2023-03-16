import { getMyNickname } from '@/api/Group';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useGetMyNikname = (groupId: GroupId) => {
  return useQuery(['myNickname', groupId], () => getMyNickname(groupId));
};
