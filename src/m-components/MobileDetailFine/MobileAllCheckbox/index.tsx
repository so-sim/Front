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
        <span>전체</span>
      </Style.AllCheckboxWrapper>
      <div>
        {/* Todo: 체크박스한 전체 금액 삽입 */}
        {totalAmount && (
          <>
            <span>합계</span>
            <span>{convertToPriceFormat(totalAmount)}원</span>
          </>
        )}
      </div>
    </Style.CheckboxRow>
  );
};

export default MobileAllCheckbox;
