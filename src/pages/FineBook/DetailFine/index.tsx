import { useEffect, useRef, useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { SelectedEventInfo, Situation } from '@/types/event';
import { DateController, DetailList, DetailsHeader, FilterController, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import * as Style from './styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import SelectedFineContextProvider from '@/contexts/SelectedFineContext';

import AlarmRequest_PaymentUpdate from '@/components/DetailFine/AlarmRequest_PaymentUpdate';

import useCheckListState from '@/hooks/useCheckListState';
import { sideModalState } from '@/store/sideModalState';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { SituationStatus } from '@/types/notification';
import styled from '@emotion/styled';
import { notificationModalState } from '@/store/notificationModalState';

export type FilterMode = 'month' | 'week' | 'day';

export const initialSelectData: SelectedEventInfo = {
  eventId: 0,
  memo: '',
  date: dayjs().format('YYYY-MM-DD'),
  situation: '미납',
  nickname: '',
  amount: 0,
  ground: '지각',
};

const SITUATION_FORMAT_STYLE: { [key in SituationStatus]: Situation } = {
  FULL: '완납',
  CHECK: '확인중',
  NONE: '미납',
};
const DetailFine = () => {
  const { groupId } = useParams();

  const location = useLocation();

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(detailFilter, calendarDate);

  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const [showNotification, setShowNotification] = useRecoilState(notificationModalState);
  const { isModal } = sideModal;

  const {
    checkDetailFine,
    checkedSize,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  useEffect(() => {
    setInitCheckDetailFine();
  }, [calendarDate, location]);

  const [alarmState, setAlarmEventIdList] = useRecoilState(alarmInfoState);

  const [searchParam, setSearhParam] = useSearchParams();

  const notificationFilterTrigger = useRef(false);

  useEffect(() => {
    if (notificationFilterTrigger.current === true) {
      setAlarmEventIdList(initAlarmInfoState);
      // 전역 AlarmState 초기화는 DetailList / MobileLayout / ALarmInfo - onSuccess 에서 진행되고 있다
      return;
    }
    //

    if (showNotification) {
      notificationFilterTrigger.current = true;
    }
  }, [showNotification]);
  // 해당 useEffect는 Alarm index 41Line과도 연관이 있습니다.

  useEffect(() => {
    if (alarmState.groupId && alarmState.nickname) {
      setDetailFilter((prev) => ({ ...prev, nickname: alarmState.nickname || '', situation: SITUATION_FORMAT_STYLE[alarmState.afterSituation || 'NONE'] }));
      // 닉네임과 납부여부 설정하는 곳인데/  닉네임설정하려면 input 창 맨처음에 설정해야함
    }
  }, [groupId, alarmState]);

  // check를 다시 풀고 다시 해줘야 User인터랙션이 겹쳤을 때 바뀐 상태를 다시 저장할 수 있다.  (그래서 그냥 다시 요청을 보내기로)

  return (
    <SelectedFineContextProvider>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController setDetailFilter={setDetailFilter} />
          <FilterController detailFilter={detailFilter} setDetailFilter={setDetailFilter} totalAmount={1_000_000} />
          <TableHead setDetailFilter={setDetailFilter} details={data?.content.eventList} />
          <DetailList detailFilter={detailFilter} details={data?.content.eventList} />
        </Style.DetailContent>
        <Pagination totalCount={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
        <UserDetails />
        {isModal && !showNotification && checkedSize > 0 && (
          <AlarmRequest_PaymentUpdate.DesktopFrame>
            <AlarmRequest_PaymentUpdate.DesktopHeader />
            <AlarmRequest_PaymentUpdate checkDetailFine={{ ...checkDetailFine }} />
          </AlarmRequest_PaymentUpdate.DesktopFrame>
        )}
      </Style.DetailFineFrame>
    </SelectedFineContextProvider>
  );
};

export default DetailFine;
