import { Card } from '..';
import { GroupInfo } from '../../CardList';
import * as Style from './style';
import { USER } from '../../../../../assets/icons/User';
import { useNavigate } from 'react-router-dom';

export const GroupCard = ({ title, color, admin }: GroupInfo) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/group/1`)}>
      <Style.GroupColor color={color} />
      <Style.GroupInfo>
        <Style.GroupTitle>{title}</Style.GroupTitle>
        <Style.GroupPeople>
          <Style.GroupIcon>{USER.GROUP_MD}</Style.GroupIcon>
          <Style.GroupAdminName>{admin}</Style.GroupAdminName>
        </Style.GroupPeople>
      </Style.GroupInfo>
    </Card>
  );
};
