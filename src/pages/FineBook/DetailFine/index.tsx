import { useEffect, useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { EventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/store/dateState';
import { useLocation, useParams } from 'react-router-dom';
import { dateFilterMode, DateFilterProperty, updateDateFilterByMode } from '@/utils/dateFilter';

export type FilterMode = 'month' | 'week' | 'day';

const DetailFine = () => {
  const param = useParams<{ groupId: string }>();

  const location = useLocation();

  const [openAddModal, setOpenAddModal] = useState(location.state || false);

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<EventInfo>({
    userId: 0,
    eventId: 0,
    groundsDate: '',
    paymentType: 'non',
    userName: '',
    payment: 0,
    grounds: '',
  });

  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<FilterMode>('day');
  const [dateFilter, setDateFilter] = useState<DateFilterProperty>({ nickname: '', paymentType: '' });

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(dateFilter, calendarDate.baseDate, { groupId: Number(param.groupId) });

  useEffect(() => {
    setPage(0);
    setMode(() => dateFilterMode(calendarDate));
    setDateFilter((prev) => updateDateFilterByMode(mode, prev, calendarDate));
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
          <DateController mode={mode} setMode={setMode} setOpenAddModal={setOpenAddModal} dateFilter={dateFilter} setDateFilter={setDateFilter} />
          <TableHead setPage={setPage} setDateFilter={setDateFilter} />
          <DetailList
            dateFilter={dateFilter}
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
