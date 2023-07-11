import { searchParticipantList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useSearchParticipantList = (groupId: number | undefined, keyword: string) => {
  return useQuery(['participantList', groupId, keyword], () => searchParticipantList(groupId, keyword));
};
