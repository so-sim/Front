import { getParticipantList } from '@/api/Group';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

export const useParticipantList = (groupId: GroupId) => {
  return useQuery(['participantList', groupId], () => getParticipantList(groupId));
};
