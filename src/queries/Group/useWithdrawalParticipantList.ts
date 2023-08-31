import { searchParticipantList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useWithdrawalParticipantList = (groupId: number | undefined) => {
  const { data: participantList } = useQuery(['withdrawalParticipantList', groupId], () => searchParticipantList(groupId, ''));

  const withdrawalParticipants = participantList?.content.nicknameList.reduce((accr, curr) => {
    return curr.withdraw === true ? [...accr, curr.nickname] : accr;
  }, [] as string[]);

  const isWithdrawal = (nickname: string) => {
    return withdrawalParticipants?.includes(nickname);
  };

  const participantListWithWithdrawnMembers = participantList?.content.nicknameList.map((item) => item.nickname);

  return {
    participantListWithWithdrawnMembers,
    withdrawalParticipants,
    isWithdrawal,
  };
};
