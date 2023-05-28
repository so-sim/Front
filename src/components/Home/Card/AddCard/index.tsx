import { FC } from 'react';
import { Card } from '..';
import { SYSTEM } from '@/assets/icons/System';
import * as Style from './styles';
import { GA } from '@/constants/GA';

interface AddCardProps {
  onClick: () => void;
}

export const AddCard: FC<AddCardProps> = ({ onClick }) => {
  return (
    <Card onClick={onClick}>
      <Style.AddCardFrame id={GA.CREATE.MAIN_BUTTON}>
        {SYSTEM.PLUS}
        <Style.AddCardText>모임 만들기</Style.AddCardText>
      </Style.AddCardFrame>
    </Card>
  );
};
