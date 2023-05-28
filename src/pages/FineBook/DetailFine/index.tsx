import { useEffect, useMemo, useState } from 'react';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { ClientEventInfo, EventInfo } from '@/types/event';
import { DateController, DetailList, DetailsHeader, Pagination, TableHead, UserDetails } from '@/components/DetailFine';
import { FineBookModal } from '@/components/@common/Modal/FineBookModal';
import * as Style from './styles';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/store/dateState';
import { useLocation, useParams } from 'react-router-dom';
import { DateFilter, DetailFilter } from '@/utils/dateFilter/dateFilter';

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
  const { groupId } = useParams();

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<ClientEventInfo>(initialSelectData);

  const [mode, setMode] = useState<FilterMode>('day');
  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', paymentType: '', page: 0 });

  const calendarDate = useRecoilValue(dateState);
  const { data } = useGetDetailList(detailFilter, calendarDate.baseDate, { groupId: Number(groupId) });

  const dateFilter = useMemo(() => new DateFilter(mode, calendarDate.week), [mode]);

  useEffect(() => {
    setMode(() => dateFilter.decideMode(calendarDate));
    setDetailFilter((prev) => ({ ...dateFilter.update(prev, calendarDate), page: 0 }));
  }, [calendarDate.selectedDate, calendarDate.baseDate, calendarDate.week, mode]);

  // 캘린더에서 내역 계속해서 추가하기를 했을 때 모달이 꺼지지 않고, 켜져 있어야 함
  // 처음 렌더링 되었을 때 켜져있고, 그 이후 동작에 맡겨야 하기 때문에 아래 useEffect에서 state null로 바꿔줌
  const location = useLocation();
  const [openAddModal, setOpenAddModal] = useState<boolean>(location.state || false);
  useEffect(() => {
    window.history.replaceState(null, '');
  }, []);
  const handleAddModal = () => {
    setOpenAddModal((prev) => !prev);
  };

  return (
    <>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController mode={mode} setMode={setMode} addModalHandler={handleAddModal} />
          <TableHead setDetailFilter={setDetailFilter} />
          <DetailList
            detailFilter={detailFilter}
            mode={mode}
            selectedEventId={select.eventId}
            details={data?.content.list}
            setSelect={setSelect}
            setOpenUserDetails={setOpenUserDetails}
          />
        </Style.DetailContent>
        {Number(data?.content.totalCount) > 16 && <Pagination count={data?.content.totalCount} detailFilter={detailFilter} setDetailFilter={setDetailFilter} />}
        {openUserDetails && <UserDetails setOpen={setOpenUserDetails} select={select} setSelect={setSelect} />}
      </Style.DetailFineFrame>
      {openAddModal && <FineBookModal modalHandler={handleAddModal} />}
    </>
  );
};

export default DetailFine;
