import { getParticipantList, ParticipantList } from '@/api/Group';
import { ServerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useParticipantList = (groupId: string) => {
  return useQuery<ServerResponse<ParticipantList>>(['participantList', groupId], () => getParticipantList(groupId));
};
