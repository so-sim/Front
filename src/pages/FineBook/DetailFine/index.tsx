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
import { alarmInfoState } from '@/store/alarmInfoState';
import { SituationStatus } from '@/types/notification';
import styled from '@emotion/styled';

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

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(detailFilter, calendarDate);

  const [sideModal, setSideModal] = useRecoilState(sideModalState);

  const { isModal } = sideModal;

  const {
    checkDetailFine,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  useEffect(() => {
    setInitCheckDetailFine();
  }, [calendarDate]);

  const [alarmState, setAlarmEventIdList] = useRecoilState(alarmInfoState);

  const [searchParam, setSearhParam] = useSearchParams();

  useEffect(() => {
    setDetailFilter({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });
    if (alarmState.groupId && alarmState.nickname) {
      setDetailFilter((prev) => ({ ...prev, nickname: alarmState.nickname || '', situation: SITUATION_FORMAT_STYLE[alarmState.afterSituation || 'NONE'] }));
      // 닉네임과 납부여부 설정하는 곳인데/  닉네임설정하려면 input 창 맨처음에 설정해야함
    }
  }, [groupId, alarmState, searchParam]);

  // check를 다시 풀고 다시 해줘야 User인터랙션이 겹쳤을 때 바뀐 상태를 다시 저장할 수 있다.  (그래서 그냥 다시 요청을 보내기로)

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const [search, setSearch] = useSearchParams();

  const navRef = useRef(false);
  const [prevSearchParam, setPrevSearchParam] = useState('');
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   // F5를 누르거나 페이지를 새로고침할 때 search param 제어
  //   // 예시: param이 'example'일 때만 제거하는 경우

  //   // console.log(location.state);
  //   if (location.state && location.state.tag) {
  //     console.log('che');
  //     return;
  //   }

  //   if (searchParams.get('isnotification')) {
  //     searchParams.delete('isnotification');
  //     navigate({ search: searchParams.toString() });
  //   }
  // }, [location]);

  // useEffect(() => {
  //   if (location.state && location.state.tag) {
  //     return;
  //   }
  //   console.log('dd');

  //   search.delete('isnotification');
  //   setSearch(search);
  // }, [location.state && location.state.tag]);

  // const testt = (e: BeforeUnloadEvent) => {
  //   e.preventDefault();

  //   const searchParams = new URLSearchParams(location.search);
  //   search.delete('isnotification');
  //   setSearch(search);
  // };

  // useEffect(() => {
  //   const testt = (e: BeforeUnloadEvent) => {
  //     const searchParams = new URLSearchParams(location.search);

  //     // 새로고침 시에만 특정 param 제거
  //     if (searchParams.get('isnotification')) {
  //       searchParams.delete('isnotification');
  //       navigate({ search: searchParams.toString() });
  //     }
  //   };
  //   window.addEventListener('beforeunload', testt);
  //   return () => {
  //     window.removeEventListener('beforeunload', testt);
  //   };
  // }, []);

  // 새로고침 시 searchparam 지우고 싶었는데..

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
        {isModal && (
          <AlarmRequest_PaymentUpdate.DesktopFrame>
            <AlarmRequest_PaymentUpdate.DesktopHeader />
            <AlarmRequest_PaymentUpdate checkDetailFine={{ ...checkDetailFine }} />
          </AlarmRequest_PaymentUpdate.DesktopFrame>
        )}
        {alarmState.groupId && <BackDrop />}
      </Style.DetailFineFrame>
    </SelectedFineContextProvider>
  );
};

export default DetailFine;

export const BackDrop = styled.div`
  position: absolute;
  top: 68px;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: #2d2d2d;
  opacity: 30%;

  z-index: 9998;
`;
