import { useState } from 'react';
import * as Style from './styles';
import { CheckDetailFine, SetCheckDetailFine, SelectedEventInfo_Checked } from '@/hooks/useCheckDetailFine';
type Props = {
  list: SelectedEventInfo_Checked[];
};
const ItemList = ({ list }: Props) => {
  const [toggle, setToggle] = useState(false);

  const TotalAmount = list.reduce((prev, current) => prev + current.amount, 0);

  return (
    <>
      <Style.ItemlistContainer onClick={() => setToggle((prev) => !prev)}>
        <Style.ItemWrapper>
          <input type="checkbox" />
          <Style.ItemTitle>안녕하세요안녕하세요안녕</Style.ItemTitle>
          <Style.AmountConatiner isOpen={toggle}>{TotalAmount}</Style.AmountConatiner>
        </Style.ItemWrapper>
        {toggle &&
          list.map((item) => (
            <Style.DetailList>
              <Style.DateText>{item.date}</Style.DateText>
              <Style.AmountText>{item.amount}</Style.AmountText>
            </Style.DetailList>
          ))}
      </Style.ItemlistContainer>
    </>
  );
};

export default ItemList;
