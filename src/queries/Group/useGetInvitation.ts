import { getInvitation, getMyNickname } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useGetInvitation = (groupId: number | undefined) => {
  return useQuery(['invitaion', groupId], () => getInvitation(groupId), {});
};
