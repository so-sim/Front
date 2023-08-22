import SelectAllCheckbox from '@/components/@common/Checkbox/SelectAllCheckbox';
import { SelectedEventInfo } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertFormat';
import React from 'react';

import * as Style from './styles';

type Props = {
  details: SelectedEventInfo[];
  totalAmount?: number;
};

const MobileAllCheckbox = ({ details, totalAmount }: Props) => {
  return (
    <Style.CheckboxRow>
      <Style.AllCheckboxWrapper>
        <SelectAllCheckbox details={details} />
        <Style.ChecboxLabel>전체</Style.ChecboxLabel>
      </Style.AllCheckboxWrapper>
      <Style.AmountWrapper>
        {/* Todo: 체크박스한 전체 금액 삽입 */}
        {totalAmount && (
          <>
            <Style.AmountLebel>합계</Style.AmountLebel>
            <Style.Amount>{convertToPriceFormat(totalAmount)}원</Style.Amount>
          </>
        )}
      </Style.AmountWrapper>
    </Style.CheckboxRow>
  );
};

export default MobileAllCheckbox;
