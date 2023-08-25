import { getDetailListById } from '@/api/Event';
import { useGroupDetail } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useCheckListState from '../useCheckListState';

const useValidateSituation = () => {
  const { groupId } = useParams();
  const { checkDetailFineValues, checkDetailFineKeys } = useCheckListState();

  const { refetch: refetchEventListById } = useQuery(['isSameSituationByServerState'], () =>
    getDetailListById({ groupId: Number(groupId), eventIdsList: checkDetailFineKeys.map(Number) }),
  );

  const { data: group } = useGroupDetail(Number(groupId));
  const { data: myNick } = useGetMyNikname(Number(groupId));
  const { withdrawalParticipants } = useWithdrawalParticipantList(Number(groupId));
  const isAdmin = group?.content.isAdmin;
  const myNickname = myNick?.content.nickname;

  /**
   * 리스트 아이디로 get요청 날려서 전부 다 같은 상태값인지 조회하는 함수 만들어야 함
   */
  const isOnlyNonSituationCheckList = () => {
    return checkDetailFineValues.every((item) => item.situation === '미납');
  };

  const isOnlyMemberCheckList = () => {
    return isAdmin && checkDetailFineValues.every(({ nickname }) => nickname !== myNickname);
  };

  const isIncludeWithdrawalMember = () => {
    return checkDetailFineValues.some(({ nickname }) => withdrawalParticipants?.includes(nickname));
  };

  const isSameSituationByServerState = async (): Promise<boolean> => {
    const { data } = await refetchEventListById();
    const checkedDetailList = data?.content.eventList;
    const isAllSameSituation = new Set(checkedDetailList?.map(({ situation }) => situation)).size === 1;

    return isAllSameSituation;
  };

  const isValidRequestPayment = async () => {
    if (isOnlyNonSituationCheckList() && isOnlyMemberCheckList() && !isIncludeWithdrawalMember()) {
      const result = await isSameSituationByServerState();
      return result;
    }

    return false;
  };

  return { isValidRequestPayment, isSameSituationByServerState };
};

export default useValidateSituation;
