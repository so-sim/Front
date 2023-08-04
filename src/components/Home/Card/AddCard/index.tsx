import { Card } from '..';
import { SYSTEM } from '@/assets/icons/System';
import * as Style from './styles';
import { GA } from '@/constants/GA';

type Props = {
  onClick: () => void;
  size?: 'sm' | 'md';
};

export const AddCard = ({ onClick, size = 'md' }: Props) => {
  return (
    <Card onClick={onClick} size={size}>
      <Style.AddCardFrame id={GA.CREATE.MAIN_BUTTON}>
        {SYSTEM.PLUS}
        <Style.AddCardText>모임 만들기</Style.AddCardText>
      </Style.AddCardFrame>
    </Card>
  );
};
