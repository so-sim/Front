import { useState } from 'react';
import * as Style from './styles';
import { CheckDetailFine, SetCheckDetailFine, SelectedEventInfo_Checked } from '@/hooks/useCheckDetailFine';
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
      <Style.ItemlistContainer onClick={() => setToggle((prev) => !prev)}>
        <Style.ItemWrapper>
          <input type="checkbox" onChange={() => setToggleCheckDetailFineByNickName(myName)} />
          <Style.ItemTitle>안녕하세요안녕하세요안녕</Style.ItemTitle>
          <Style.AmountConatiner isOpen={toggle}>{TotalAmount}</Style.AmountConatiner>
        </Style.ItemWrapper>
        {toggle &&
          list?.map((item) => (
            <Style.DetailList key={item.eventId}>
              <Style.DateText>{item.date}</Style.DateText>
              <Style.AmountText>{item.amount}</Style.AmountText>
            </Style.DetailList>
          ))}
      </Style.ItemlistContainer>
    </>
  );
};

export default ItemList;
