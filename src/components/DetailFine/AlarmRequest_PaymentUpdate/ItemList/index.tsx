import { useState } from 'react';
import * as Style from './styles';
import { SetCheckDetailFine, SelectedEventInfo_Checked } from '@/components/DetailFine/AlarmRequest_PaymentUpdate/hooks/useCheckDetailFine';

type Props = {
  myName: string;
  list?: SelectedEventInfo_Checked[];
  setCheckDetailFine: SetCheckDetailFine;
};

const ItemList = ({ myName, list, setCheckDetailFine }: Props) => {
  const [toggle, setToggle] = useState(false);

  const TotalAmount = list?.reduce((prev, current) => prev + current.amount, 0);

  const isChecked = list?.every((item) => item.checked === true);

  const { setToggleCheckDetailFineByNickName } = setCheckDetailFine;

  const toggleCheckDetailFine = (event: React.MouseEvent<HTMLInputElement>, myName: string) => {
    event.stopPropagation();
    setToggleCheckDetailFineByNickName(myName);
  };

  if (list?.length === 0) return null;
  return (
    <>
      <Style.ItemContainer onClick={() => setToggle((prev) => !prev)}>
        <Style.ItemWrapper>
          <input type="checkbox" checked={isChecked} onClick={(event: React.MouseEvent<HTMLInputElement>) => toggleCheckDetailFine(event, myName)} readOnly />
          <Style.ItemTitle>안녕하세요안녕하세요안녕</Style.ItemTitle>
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

export default ItemList;
