import { useGroupDetail } from '@/queries/Group';
import { firstVisitState } from '@/store/firstVisitState';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Calendar } from '@/components/@common';
import InviteModal from '@/components/@common/Modal/InviteModal';

const WholeCalendar = () => {
  const { groupId } = useParams();
  const [{ isFirstVisit }, setIsFirstVisit] = useRecoilState(firstVisitState);
  const [dateObj, setDateObj] = useRecoilState(dateState);

  const { data } = useGroupDetail(Number(groupId));

  const isAdmin = data?.content.isAdmin;

  const handleGroupInviteModal = () => {
    setIsFirstVisit((prev) => ({ ...prev, isFirstVisit: false }));
  };

  useEffect(() => {
    setDateObj((prev) => ({
      ...prev,
      baseDate: dayjs(),
    }));
    // 여기 부분 로직 고민중
  }, []);

  return (
    <>
      <Calendar cellType="Tag" />
      {isAdmin && isFirstVisit && <InviteModal onClick={handleGroupInviteModal} />}
    </>
  );
};

export default WholeCalendar;
