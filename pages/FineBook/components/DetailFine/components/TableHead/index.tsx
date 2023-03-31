import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { FilterMode } from '../..';
import { DateFilterProperty } from '@/pages/FineBook/utils/dateFilterToQuery';
import { useParticipantList } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import DropDown from '@/common/DropDown';

interface TableHeadProps {
  mode: FilterMode;
  setMode: Dispatch<SetStateAction<FilterMode>>;
  dateFilter: DateFilterProperty;
  setDateFilter: Dispatch<SetStateAction<DateFilterProperty>>;
}

export const TableHead: FC<TableHeadProps> = ({ dateFilter, setDateFilter }) => {
  const param = useParams();

  const { data, isLoading, error } = useParticipantList({ groupId: Number(param.groupId) });

  // if (isLoading || error) {
  //   return null;
  // }

  const adminNickname = data?.content.adminNickname;
  const participants = data?.content.nicknameList.map((nickname) => ({ title: nickname }));

  const [openDrop, setOpenDrop] = useState(false);

  return (
    <Style.TableHead>
      <Style.Element>날짜</Style.Element>
      <Style.Element>
        <span>납부여부</span>
        <Style.Arrow
          onClick={() => {
            setDateFilter((prev) => ({ ...prev, paymentType: 'non', page: 0 }));
          }}
        >
          {ARROW.DOWN_SM}
        </Style.Arrow>
      </Style.Element>
      <Style.Element
        onClick={() => {
          setOpenDrop((prev) => !prev);
          // setDateFilter((prev) => ({ ...prev, userId: 0, page: 0 }));
        }}
      >
        <span>팀원</span>
        <Style.Arrow>{ARROW.DOWN_SM}</Style.Arrow>
        {adminNickname && participants && openDrop && (
          <DropDown
            list={[...participants, { title: adminNickname }].sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0))}
            width={208}
            top="40px"
            onClose={() => setOpenDrop(false)}
            direction="right"
          />
        )}
      </Style.Element>
      <Style.Element>금액</Style.Element>
      <Style.Element>사유</Style.Element>
    </Style.TableHead>
  );
};
