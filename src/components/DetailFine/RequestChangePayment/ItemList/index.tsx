import { useState } from 'react';
import * as Style from './styles';

const ItemList = () => {
  const [toggle, setToggle] = useState(false);

  
  return (
    <Style.Item>
      <input type="checkbox" />
      <Style.ItemTitle>안녕하세요안녕하세요안녕</Style.ItemTitle>
      <Style.AmountConatiner>100000000원</Style.AmountConatiner>
    </Style.Item>
  );
};

export default ItemList;
