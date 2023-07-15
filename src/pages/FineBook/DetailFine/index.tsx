import { useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { SelectedEventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, FilterController, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import SelectedFineContextProvider from '@/contexts/SelectedFineContext';

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

  return (
    <SelectedFineContextProvider>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController setDetailFilter={setDetailFilter} />
          <FilterController detailFilter={detailFilter} setDetailFilter={setDetailFilter} totalAmount={1_000_000} />
          <TableHead setDetailFilter={setDetailFilter} />
          <DetailList detailFilter={detailFilter} details={data?.content.eventList} />
        </Style.DetailContent>
        <Pagination totalCount={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
        <UserDetails />
      </Style.DetailFineFrame>
    </SelectedFineContextProvider>
  );
};

export default DetailFine;
