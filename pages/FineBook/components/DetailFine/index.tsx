import React, { useState } from 'react';
import { DateController } from './components/DateController';
import { DetailList } from './components/DetailList';
import { DetailsHeader } from './components/DetailsHeader';
import { FineBookModal } from './components/FineBookModal';
import { Pagination } from './components/Pagination';
import { TableHead } from './components/TableHead';
import { UserDetails } from './components/UserDetails';
import * as Style from './styles';

export type Status = 'none' | 'checking' | 'complete';

export interface Details {
  date: string;
  status: string;
  name: string;
  fine: number;
  reason: string;
}

const DetailFine = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<Details>({ date: '', status: 'none', name: '', fine: 0, reason: '' });
  const [page, setPage] = useState(1);

  const details: Details[] = [
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'none', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'checking', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
    { date: '23.01.22', status: 'complete', name: '윤하나둘셋', fine: 1_000_000, reason: '밥먹다 지각' },
  ];

  return (
    <>
      <Style.DetailFineFrame>
        <DetailsHeader />
        <Style.DetailContent>
          <DateController setOpenAddModal={setOpenAddModal} />
          <TableHead />
          <DetailList details={details} page={page} setSelect={setSelect} setOpenUserDetails={setOpenUserDetails} />
        </Style.DetailContent>
        <Pagination details={details} page={page} setPage={setPage} />
        <UserDetails open={openUserDetails} setOpen={setOpenUserDetails} select={select} />
      </Style.DetailFineFrame>
      {openAddModal && <FineBookModal setOpen={setOpenAddModal} />}
    </>
  );
};

export default DetailFine;
