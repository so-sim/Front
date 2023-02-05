import { Card } from '..';
import { Group } from '../../CardList';
import * as Style from './style';
import * as User from '../../../../../assets/icons/User';

export const GroupCard = ({ title, color, people }: Group) => {
  return (
    <Card>
      <Style.GroupColor color={color} />
      <Style.GroupInfo>
        <Style.GroupTitle>{title}</Style.GroupTitle>
        <Style.GroupPeople>
          <User.Group />
          <div>{people}명</div>
        </Style.GroupPeople>
      </Style.GroupInfo>
    </Card>
  );
};
