import { useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { SelectedEventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import SelectedFineContextProvider from '@/contexts/SelectedFineContext';
import useCheckDetailFine from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import AlarmRequest_PaymentUpdate from '@/components/DetailFine/AlarmRequest_PaymentUpdate';
import useMultiRefs from '@/hooks/useMultiRefs';

export type FilterMode = 'month' | 'week' | 'day';

export const initialSelectData: SelectedEventInfo = {
  eventId: 0,
  memo: '',
  date: dayjs().format('YYYY.MM.DD'),
  situation: '미납',
  nickname: '',
  amount: 0,
  ground: '지각',
};

const DetailFine = () => {
  const { groupId } = useParams();

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(detailFilter, calendarDate);

  const { checkDetailFine, setCheckDetailFine } = useCheckDetailFine();
  // 현재 걍 context쓸지 고민 중 (checkDetailFine과 paymentControl - type 관련 )

  // 선택 시 Button을 어느 컴포넌트에서 띄어줄까 고민.. DetailList 위에로? TableHead 안쪽??

  // openConfirmModal의 목적 ??

  // 해당 페이지에서 더 디테일하게 폴더단위가 아니라 파일로 쪼개도 되려나??..

  // 기존 UserDetail을 그냥 포탈처럼 작동을 하도록 고민중. (또한 )

  // setState 테스팅 가능한지??

  // userDetail 사이즈 고민

  const { setInitCheckDetailFine } = setCheckDetailFine;

  const { addRef } = useMultiRefs(setInitCheckDetailFine);

  return (
    <SelectedFineContextProvider>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController setDetailFilter={setDetailFilter} />
          <TableHead
            setDetailFilter={setDetailFilter}
            details={data?.content.eventList}
            checkDetailFine={checkDetailFine}
            setCheckDetailFine={setCheckDetailFine}
            addref={addRef}
          />
          <DetailList detailFilter={detailFilter} details={data?.content.eventList} checkDetailFine={checkDetailFine} setCheckDetailFine={setCheckDetailFine} addref={addRef} />
        </Style.DetailContent>

        <Pagination totalCount={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
        <UserDetails />
        <AlarmRequest_PaymentUpdate checkDetailFine={checkDetailFine} setCheckDetailFine={setCheckDetailFine} />
      </Style.DetailFineFrame>
    </SelectedFineContextProvider>
  );
};

export default DetailFine;
