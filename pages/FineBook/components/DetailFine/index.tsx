import { useState } from 'react';
import { useQueryString } from '@/hooks/useQueryString';
import { useGetDetailList } from '@/queries/Detail/useGetDetailList';
import { EventFilter, EvnetInfo } from '@/types/event';
import { DateController } from './components/DateController';
import { DetailList } from './components/DetailList';
import { DetailsHeader } from './components/DetailsHeader';
import { FineBookModal } from './components/FineBookModal';
import { Pagination } from './components/Pagination';
import { TableHead } from './components/TableHead';
import { UserDetails } from './components/UserDetails';
import * as Style from './styles';

export type Status = 'none' | 'checking' | 'complete';

const DetailFine = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<EvnetInfo>({
    userId: 12,
    eventId: Math.floor(Math.random() * 10000),
    groundsDate: '23.01.22',
    paymentType: '미납',
    userName: '윤하나둘셋',
    payment: 1_000_000,
    grounds: '밥먹다 지각',
  });
  const [page, setPage] = useState(1);

  const queries = useQueryString();

  const { data } = useGetDetailList(queries);

  // ('/api/event/penalty?today=true');
  // ('/api/event/penalty?paymentType="non | con | full"');
  // ('/api/event/penalty?month=3&week=1&day=19&userId=124125');

  return (
    <>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController setOpenAddModal={setOpenAddModal} />
          <TableHead />
          <DetailList details={data?.content} page={page} setSelect={setSelect} setOpenUserDetails={setOpenUserDetails} />
        </Style.DetailContent>
        <Pagination count={data?.content.length} page={page} setPage={setPage} />
        <UserDetails open={openUserDetails} setOpen={setOpenUserDetails} select={select} />
      </Style.DetailFineFrame>
      {openAddModal && <FineBookModal setOpen={setOpenAddModal} />}
    </>
  );
};

export default DetailFine;
