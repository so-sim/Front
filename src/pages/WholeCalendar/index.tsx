import { useGroupDetail } from '@/queries/Group';
import { firstVisitState } from '@/store/firstVisitState';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Calendar } from '@/components/@common';
import InviteModal from '@/components/@common/Modal/InviteModal';

const WholeCalendar = () => {
  const [{ isFirstVisit }, setIsFirstVisit] = useRecoilState(firstVisitState);
  const [dateObj, setDateObj] = useRecoilState(dateState);
  const { groupId } = useParams();
  const { data: group } = useGroupDetail(Number(groupId));

  const handleGroupInviteModal = () => {
    setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: false }));
  };

  useEffect(() => {
    setDateObj((prev) => ({
      ...prev,
      baseDate: dayjs(),
      startDate: dayjs(),
      endDate: dayjs(),
      mode: 'day',
    }));
    // 여기 부분 로직 고민중
  }, []);

  return (
    <>
      <Calendar cellType="Tag" />
      {group?.content.isAdmin && isFirstVisit && <InviteModal onClick={handleGroupInviteModal} />}
    </>
  );
};

export default WholeCalendar;
