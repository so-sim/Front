import { useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { dateStateTest } from '@/store/dateStateTest';
import { DetailFilter } from '@/store/detailFilter';

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

  const [select, setSelect] = useState<SelectedEventInfo>(initialSelectData);
  const hasSelectedInfo: boolean = select.eventId !== 0;

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });

  const calendarDate = useRecoilValue(dateStateTest);
  const { data } = useGetDetailList(detailFilter, calendarDate);

  return (
    <Style.DetailFineFrame>
      <DetailsHeader />
      <Style.DetailContent>
        <DateController setDetailFilter={setDetailFilter} />
        <TableHead setDetailFilter={setDetailFilter} />
        <DetailList detailFilter={detailFilter} selectedEventId={select.eventId} details={data?.content.eventList} setSelect={setSelect} />
      </Style.DetailContent>
      <Pagination totalCount={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />
      {hasSelectedInfo && <UserDetails select={select} setSelect={setSelect} />}
    </Style.DetailFineFrame>
  );
};

export default DetailFine;
