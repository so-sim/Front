import { useEffect, useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { EvnetInfo } from '@/types/event';
import { DateController } from './components/DateController';
import { DetailList } from './components/DetailList';
import { DetailsHeader } from './components/DetailsHeader';
import { FineBookModal } from '@/common/Modal/FineBookModal';
import { Pagination } from './components/Pagination';
import { TableHead } from './components/TableHead';
import { UserDetails } from './components/UserDetails';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { DateFilterProperty } from '@/pages/FineBook/utils/dateFilter';

export type FilterMode = 'month' | 'week' | 'day';

export type Status = 'none' | 'checking' | 'complete';

export interface DateFilter {
  type: string;
  value: string;
  page: number;
}

const DetailFine = () => {
  const param = useParams<{ groupId: string }>();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<EvnetInfo>({
    userId: 12,
    eventId: Math.floor(Math.random() * 10000),
    groundsDate: '23.01.22',
    paymentType: 'non',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각',
  });

  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<DateFilterProperty>({});
  const [mode, setMode] = useState<FilterMode>('day');

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(dateFilter, calendarDate.baseDate, { groupId: Number(param.groupId) });

  useEffect(() => {
    if (calendarDate.selectedDate !== null) setMode('day');
    if (calendarDate.week !== null) setMode('week');
    if (calendarDate.selectedDate === null && calendarDate.week === null) setMode('month');

    const [year, month, day] = dayjs(calendarDate.baseDate)
      .format('YYYY.MM.DD')
      .split('.')
      .map((property) => Number(property));

    if (mode === 'week') {
      setDateFilter((prev) => {
        const { day, ...rest } = prev;
        return { ...rest, year, month, week: calendarDate.week, page: 0 };
      });
    }
    if (mode === 'day') {
      setDateFilter((prev) => {
        const { week, ...rest } = prev;
        return { ...rest, year, month, day, page: 0 };
      });
    }
    if (mode === 'month') {
      setDateFilter((prev) => {
        const { week, day, ...rest } = prev;
        return { ...rest, year, month, page: 0 };
      });
    }
  }, [calendarDate.selectedDate, calendarDate.baseDate, calendarDate.week, mode]);

  return (
    <>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController mode={mode} setMode={setMode} setOpenAddModal={setOpenAddModal} dateFilter={dateFilter} setDateFilter={setDateFilter} />
          <TableHead mode={mode} setMode={setMode} dateFilter={dateFilter} setDateFilter={setDateFilter} />
          <DetailList details={data?.content.list} page={page} setSelect={setSelect} setOpenUserDetails={setOpenUserDetails} />
        </Style.DetailContent>
        {data?.content.total && data?.content.total > 16 && <Pagination count={data?.content.total} page={page} setPage={setPage} />}
        <UserDetails open={openUserDetails} setOpen={setOpenUserDetails} select={select} />
      </Style.DetailFineFrame>
      {openAddModal && <FineBookModal setOpen={setOpenAddModal} />}
    </>
  );
};

export default DetailFine;
