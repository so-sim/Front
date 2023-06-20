import { useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { ClientEventInfo, EventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
// import { DetailFilter } from '@/utils/dateFilter/dateFilter';
import dayjs from 'dayjs';
import { dateStateTest } from '@/store/dateStateTest';
import { DetailFilter } from '@/store/detailFilter';

export type FilterMode = 'month' | 'week' | 'day';

export const initialSelectData: EventInfo = {
  userId: 0,
  eventId: 0,
  groundsDate: dayjs().format('YYYY.MM.DD'),
  paymentType: 'non',
  userName: '',
  payment: 0,
  grounds: '',
};

const DetailFine = () => {
  const { groupId } = useParams();

  const [select, setSelect] = useState<ClientEventInfo>(initialSelectData);
  const hasSelectedInfo: boolean = select.eventId !== 0;

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  const calendarDate = useRecoilValue(dateStateTest);
  const { data } = useGetDetailList(detailFilter, calendarDate.baseDateTest, { groupId: Number(groupId) });

  return (
    <Style.DetailFineFrame>
      <DetailsHeader />
      <Style.DetailContent>
        <DateController setDetailFilter={setDetailFilter} />
        <TableHead setDetailFilter={setDetailFilter} />
        <DetailList detailFilter={detailFilter} selectedEventId={select.eventId} details={data?.content.list} setSelect={setSelect} />
      </Style.DetailContent>
      <Pagination totalCount={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
      {hasSelectedInfo && <UserDetails select={select} setSelect={setSelect} />}
    </Style.DetailFineFrame>
  );
};

export default DetailFine;
