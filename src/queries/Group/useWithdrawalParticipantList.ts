import { searchParticipantList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useWithdrawalParticipantList = (groupId: number | undefined) => {
  const { data: participantList } = useQuery(['withdrawalParticipantList', groupId], () => searchParticipantList(groupId, ''));

  return {
    withdrawalParticipants: participantList?.content.nicknameList.reduce((accr, curr) => {
      return curr.withdraw === true ? [...accr, curr.nickname] : accr;
    }, [] as string[]),
  };
};
