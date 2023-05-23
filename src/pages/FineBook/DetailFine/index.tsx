import { useEffect, useMemo, useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { ClientEventInfo, EventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/store/dateState';
import { useLocation, useParams } from 'react-router-dom';
import { DateFilter, DateFilterProperty } from '@/utils/dateFilter/dateFilter';

export type FilterMode = 'month' | 'week' | 'day';

export const initialSelectData: EventInfo = {
  userId: 0,
  eventId: 0,
  groundsDate: '',
  paymentType: 'non',
  userName: '',
  payment: 0,
  grounds: '',
};

const DetailFine = () => {
  const param = useParams<{ groupId: string }>();

  const location = useLocation();

  const [openAddModal, setOpenAddModal] = useState(location.state || false);

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<ClientEventInfo>(initialSelectData);

  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<FilterMode>('day');
  const [dateFilterProperty, setDateFilter] = useState<DateFilterProperty>({ nickname: '', paymentType: '' });

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(dateFilterProperty, calendarDate.baseDate, { groupId: Number(param.groupId) });

  const dateFilter = useMemo(() => new DateFilter(mode, calendarDate.week), [mode]);

  useEffect(() => {
    setPage(0);
    setMode(() => dateFilter.decideMode(calendarDate));
    setDateFilter((prev) => dateFilter.update(prev, calendarDate));
  }, [calendarDate.selectedDate, calendarDate.baseDate, calendarDate.week, mode]);

  useEffect(() => {
    setDateFilter((prev) => ({ ...prev, page }));
  }, [page]);

  useEffect(() => {
    window.history.replaceState(null, '');
  }, []);

  return (
    <>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController mode={mode} setMode={setMode} setOpenAddModal={setOpenAddModal} />
          <TableHead setPage={setPage} setDateFilter={setDateFilter} />
          <DetailList
            dateFilterProperty={dateFilterProperty}
            mode={mode}
            selectedEventId={select.eventId}
            details={data?.content.list}
            setSelect={setSelect}
            setOpenUserDetails={setOpenUserDetails}
          />
        </Style.DetailContent>
        {Number(data?.content.totalCount) > 16 && <Pagination count={data?.content.totalCount} page={page} setPage={setPage} />}
        <UserDetails open={openUserDetails} setOpen={setOpenUserDetails} select={select} setSelect={setSelect} />
      </Style.DetailFineFrame>
      {openAddModal && <FineBookModal setOpen={setOpenAddModal} />}
    </>
  );
};

export default DetailFine;
