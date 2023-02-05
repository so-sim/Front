import { Card } from '..';
import { GroupInfo } from '../../CardList';
import { Group } from './style';
import * as User from '../../../../../assets/icons/User';

export const GroupCard = ({ title, color, people }: GroupInfo) => {
  return (
    <Card>
      <Group.Color color={color} />
      <Group.Info>
        <Group.Title>{title}</Group.Title>
        <Group.People>
          <Group.Icon>
            <User.Group width={16} height={16} />
          </Group.Icon>
          <Group.PeopleNumber>{people}명</Group.PeopleNumber>
        </Group.People>
      </Group.Info>
    </Card>
  );
};
