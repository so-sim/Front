import { Card } from '..';
import { GroupInfo } from '../../CardList';
import * as Style from './style';
import { USER } from '../../../../../assets/icons/User';

export const GroupCard = ({ title, color, people }: GroupInfo) => {
  return (
    <Card onClick={() => console.log('hi')}>
      <Style.GroupColor color={color} />
      <Style.GroupInfo>
        <Style.GroupTitle>{title}</Style.GroupTitle>
        <Style.GroupPeople>
          <Style.GroupIcon>{USER.GROUP}</Style.GroupIcon>
          <Style.GroupPeopleNumber>{people}명</Style.GroupPeopleNumber>
        </Style.GroupPeople>
      </Style.GroupInfo>
    </Card>
  );
};
