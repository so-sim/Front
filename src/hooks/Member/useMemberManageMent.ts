import { useGroupDetail, useParticipantList } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { useParams } from 'react-router-dom';

const useMemberManageMent = () => {
  const { groupId } = useParams();

  const { data: participantList } = useParticipantList(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));
  /**
   * 혹시 이거 때문인가.. 데이터를 갈아 끼워줘도 recoil이 갈아끼워지지 않으니까..
   * recoil로 관리를 하니까 사이드 이펙트가 발생하는구나
   * 특히 optimistic update를 할 때, onMutate에서 낙관적인 데이터 넣어주고,
   * 응답을 받고 나서는 제거해야 하는데 그럼 데이터를 넣을 때에도 setRecoilState를 해줘야 하고,
   * 응답을 받고 나서도 onSettle에서 다시 한 번 업데이트를 해줘야 하니까 불편한게 많음
   * => 서버 상태는 오직 tanstack-query 담당하게 하는 것이 맞음
   */
  const { data: group } = useGroupDetail(Number(groupId));

  return {
    groupId,
    participantList,
    myNickname,
    group,
  };
};

export default useMemberManageMent;
