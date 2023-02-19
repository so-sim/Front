import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ARROW } from '../../../../assets/icons/Arrow';
import { CIRCLE_DROP } from '../../../../assets/icons/CircleDrop';
import Button from '../../../../common/Button';
import { CircleDropButton } from './components/CircleDropButton';
import { FineBookModal } from './components/FineBookModal';
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
  const navigate = useNavigate();
  const { groupID } = useParams();

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [select, setSelect] = useState<Details>({ date: '', status: 'none', name: '', fine: 0, reason: '' });

  const closeDetails = () => {
    navigate(`/group/${groupID}/book`);
  };
  const details: Details[] = [
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
        <Style.DetailsHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Style.BackArrowIcon onClick={closeDetails}>{ARROW.DOUBLE_RIGHT}</Style.BackArrowIcon>
            <span>상세내역</span>
          </div>
        </Style.DetailsHeader>
        <div style={{ padding: '28px 32px' }}>
          <Style.DateController>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span>1월 22일~1월 28일</span>
                <span style={{ display: 'flex' }}>
                  <Style.ArrowWrapper>{ARROW.LEFT}</Style.ArrowWrapper>
                  <Style.ArrowWrapper>{ARROW.RIGHT}</Style.ArrowWrapper>
                </span>
              </span>
              <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Style.TodayButton>오늘</Style.TodayButton>
                <Style.FilterWrapper>
                  <Style.FilterButton>월간</Style.FilterButton>
                  <Style.FilterButton>주간</Style.FilterButton>
                  <Style.FilterButton last={true}>일간</Style.FilterButton>
                </Style.FilterWrapper>
              </span>
            </div>
            <Button color="black" width="124px" height="40px" onClick={() => setOpenAddModal(true)}>
              내역 추가하기
            </Button>
          </Style.DateController>
          <TableHead />
          {details.map((detail, i) => {
            const { date, status, name, fine, reason } = detail;

            return (
              <Style.TableRow
                key={i}
                onClick={() => {
                  setSelect(detail);
                  setOpenUserDetails(true);
                }}
              >
                <span>{date}</span>
                <CircleDropButton status={status} />
                <span>{name}</span>
                <span>{fine}</span>
                <span>{reason}</span>
              </Style.TableRow>
            );
          })}
        </div>
        <UserDetails open={openUserDetails} setOpen={setOpenUserDetails} select={select} />
      </Style.DetailFineFrame>
      <FineBookModal open={openAddModal} setOpen={setOpenAddModal} />
    </>
  );
};

export default DetailFine;
