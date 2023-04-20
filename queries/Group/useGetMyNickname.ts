import { getMyNickname } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useGetMyNikname = (groupId: number | undefined) => {
  return useQuery(['myNickname', groupId], () => getMyNickname(groupId), {});
};
