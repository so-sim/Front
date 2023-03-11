import { getParticipantList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useParticipantList = (groupId: string) => {
  return useQuery(['participantList', groupId], () => getParticipantList(groupId));
};
