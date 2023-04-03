import { useGroupDetail } from '@/queries/Group';
import { firstVisitState } from '@/store/\bfirstVisitState';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Calendar from '../../common/Calendar';
import { InviteModal } from '../FineBook/components/DetailFine/components/InviteModal';

const WholeCalendar = () => {
  const { groupId } = useParams();
  const [{ isFirstVisit }, setIsFirstVisit] = useRecoilState(firstVisitState);

  const { data } = useGroupDetail({ groupId: Number(groupId) });

  const isAdmin = data?.content.isAdmin;

  const handleGroupInviteModal = () => {
    setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: false }));
  };

  return (
    <>
      <Calendar cellType="Tag" />
      {isAdmin && isFirstVisit && <InviteModal onClick={handleGroupInviteModal} />}
    </>
  );
};

export default WholeCalendar;
