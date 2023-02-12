import { FC } from 'react';
import { Card } from '..';
import { SYSTEM } from '../../../../../assets/icons/System';
import * as Style from './style';

interface AddCardProps {
  onClick: () => void;
}

const AddCard: FC<AddCardProps> = ({ onClick }) => {
  return (
    <Card onClick={onClick}>
      <Style.AddCardFrame>
        {SYSTEM.PLUS}
        <Style.AddCardText>모임 만들기</Style.AddCardText>
      </Style.AddCardFrame>
    </Card>
  );
};

export default AddCard;
