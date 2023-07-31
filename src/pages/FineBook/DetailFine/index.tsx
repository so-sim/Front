import { useEffect, useState } from 'react';
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

  const { setInitCheckDetailFine } = setCheckDetailFine;

  console.log(checkDetailFine);

  useEffect(() => {
    setInitCheckDetailFine();
  }, [calendarDate]);

  return (
    <SelectedFineContextProvider>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController setDetailFilter={setDetailFilter} />
          <TableHead setDetailFilter={setDetailFilter} details={data?.content.eventList} checkDetailFine={checkDetailFine} setCheckDetailFine={setCheckDetailFine} />
          <DetailList detailFilter={detailFilter} details={data?.content.eventList} checkDetailFine={checkDetailFine} setCheckDetailFine={setCheckDetailFine} />
        </Style.DetailContent>

        <Pagination totalCount={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
        <UserDetails />
        <AlarmRequest_PaymentUpdate checkDetailFine={Object.values(checkDetailFine)} setCheckDetailFine={setCheckDetailFine} />
      </Style.DetailFineFrame>
    </SelectedFineContextProvider>
  );
};

export default DetailFine;
