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

  const { setToggleCheckDetailFineByNickName } = setCheckDetailFine;

  if (list?.length === 0) return null;
  return (
    <>
      <Style.ItemContainer onClick={() => setToggle((prev) => !prev)}>
        <Style.ItemWrapper>
          <input type="checkbox" onChange={() => setToggleCheckDetailFineByNickName(myName)} />
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
