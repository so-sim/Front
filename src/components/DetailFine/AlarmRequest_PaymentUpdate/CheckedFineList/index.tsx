import { useState } from 'react';
import * as Style from './styles';
import { SetCheckDetailFine, SelectedEventInfo_Checked } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';
import { SelectedEventInfo } from '@/types/event';
import { CheckListState } from '@/store/checkListState';
import CheckboxContainer from '@/components/@common/Checkbox';
import DetailListCheckBox from '../../checkbox';

type Props = {
  myName: string;
  list?: SelectedEventInfo[];
  isChecked: (eventId: number) => boolean;
  setCheckDetailFine: (name: string, list: SelectedEventInfo[]) => void;
  pageFromAlarm?: boolean;
};

// 팀원 수가 한명일 때로 style을 나누려고 했는데, Alarm에서 들어오는 페이지가 다르다고 첨언을 주셨다.

const CheckedFineList = ({ myName, list, setCheckDetailFine, isChecked, pageFromAlarm = false }: Props) => {
  const [toggle, setToggle] = useState(false);

  const TotalAmount = list?.reduce((prev, current) => prev + current.amount, 0);

  const isAllChecked = list?.every((item) => isChecked(item.eventId)) || false;

  const toggleCheckDetailFine = (event: React.MouseEvent<HTMLInputElement>, myName: string) => {
    event.stopPropagation();
    setCheckDetailFine(myName, list || []);
  };

  if (list?.length === 0) return null;
  return (
    <>
      <Style.ItemContainer onClick={() => setToggle((prev) => !prev)}>
        <Style.ItemWrapper>
          {/* 완납일 때는 CheckBox 가 보이면 안된다. (근데 완납을 다시 미납으로 변경하는 경우?..) */}

          <CheckboxContainer id={myName} isChecked={isAllChecked} onChange={(event: React.MouseEvent<HTMLInputElement>) => toggleCheckDetailFine(event, myName)}>
            <CheckboxContainer.Checkbox as={DetailListCheckBox} />
          </CheckboxContainer>

          <Style.ItemTitle>{myName}</Style.ItemTitle>
          <Style.ItemAmount isOpen={toggle}>{TotalAmount}</Style.ItemAmount>
        </Style.ItemWrapper>
        {toggle &&
          list?.map((item) => (
            <Style.ItemDetailList key={item.eventId}>
              <Style.ItemDetailDate>{item.date}</Style.ItemDetailDate>
              <Style.ItemDetailAmount>{item.amount}</Style.ItemDetailAmount>
            </Style.ItemDetailList>
          ))}
      </Style.ItemContainer>
    </>
  );
};

export default CheckedFineList;
