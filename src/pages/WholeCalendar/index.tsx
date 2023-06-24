import { useGroupDetail } from '@/queries/Group';
import { firstVisitState } from '@/store/firstVisitState';
import { dateStateTest } from '@/store/dateStateTest';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Calendar } from '@/components/@common';
import InviteModal from '@/components/@common/Modal/InviteModal';

const WholeCalendar = () => {
  const { groupId } = useParams();
  const [{ isFirstVisit }, setIsFirstVisit] = useRecoilState(firstVisitState);
  const [dateObj, setDateObj] = useRecoilState(dateStateTest);

  const { data } = useGroupDetail(Number(groupId));

  const isAdmin = data?.content.isAdmin;

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
  }, []);

  return (
    <>
      <Calendar cellType="Tag" />
      {isAdmin && isFirstVisit && <InviteModal onClick={handleGroupInviteModal} />}
    </>
  );
};

export default WholeCalendar;
