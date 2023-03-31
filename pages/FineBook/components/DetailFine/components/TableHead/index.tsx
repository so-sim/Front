import React, { Dispatch, FC, SetStateAction } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { DateFilter, FilterMode } from '../..';
import { DateFilterProperty } from '@/pages/FineBook/utils/dateFilterToQuery';

interface TableHeadProps {
  mode: FilterMode;
  setMode: Dispatch<SetStateAction<FilterMode>>;
  dateFilter: DateFilterProperty;
  setDateFilter: Dispatch<SetStateAction<DateFilterProperty>>;
}

export const TableHead: FC<TableHeadProps> = ({ dateFilter, setDateFilter }) => {
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
      <Style.Element>
        <span>팀원</span>
        <Style.Arrow
          onClick={() => {
            setDateFilter((prev) => ({ ...prev, userId: 0, page: 0 }));
          }}
        >
          {ARROW.DOWN_SM}
        </Style.Arrow>
      </Style.Element>
      <Style.Element>금액</Style.Element>
      <Style.Element>사유</Style.Element>
    </Style.TableHead>
  );
};
