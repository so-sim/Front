import { Card } from '..';
import { SYSTEM } from '../../../../../assets/icons/System';
import * as Style from './style';

const AddCard = () => {
  return (
    <Card>
      <Style.AddCardFrame>
        {SYSTEM.PLUS}
        <Style.AddCardText>모임 만들기</Style.AddCardText>
      </Style.AddCardFrame>
    </Card>
  );
};

export default AddCard;
