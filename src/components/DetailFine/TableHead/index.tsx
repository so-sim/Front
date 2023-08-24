import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import * as Style from './styles';
import { useParticipantList } from '@/queries/Group';
import { useParams, useSearchParams } from 'react-router-dom';
import DropDown from '@/components/@common/DropDown';
import { GA } from '@/constants/GA';
import { DetailFilter } from '@/store/detailFilter';
import { SelectedEventInfo } from '@/types/event';
import SituationList from '../../@common/Tooltip/Situation';

import SelectAllCheckbox from '@/components/@common/Checkbox/SelectAllCheckbox';
import { SYSTEM } from '@/assets/icons/System';
import { Tooltip } from '@/components/@common/Tooltip';

type Props = {
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  details?: SelectedEventInfo[];
};

type PaymentDropdown = '전체' | '미납' | '완납' | '확인중';

// const paymentTypeList: { title: PaymentDropdown; id?: string }[] = [
//   { title: '전체' },
//   { title: '미납', id: GA.FILTER.NON },
//   { title: '완납', id: GA.FILTER.FULL },
//   { title: '확인중', id: GA.FILTER.CON },
// ];

const TableHead = ({ details }: Props) => {
  return (
    <Style.TableHead>
      <SelectAllCheckbox details={details} />
      <Style.Element>날짜</Style.Element>
      <Tooltip
        title="벌금 납부여부를 변경해보세요!"
        contents={SituationList}
        width={480}
        location="BOTTOM"
        top="40px"
        left="-26px"
        defaultValue={false}
        messageBox={{ left: '232px', top: '-8px' }}
        trigger={
          <Style.PointerElement>
            <span>납부여부</span>
            <Style.Arrow>{SYSTEM.TOOLTIP_INFO}</Style.Arrow>
          </Style.PointerElement>
        }
      />
      <Style.Element>
        <span>팀원</span>
      </Style.Element>
      <Style.Element>금액</Style.Element>
      <Style.Element>사유</Style.Element>
    </Style.TableHead>
  );
};

export default TableHead;
