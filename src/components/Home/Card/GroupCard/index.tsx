import { Card } from '..';
import * as Style from './styles';
import { USER } from '@/assets/icons/User';
import { useNavigate } from 'react-router-dom';
import { GropuList } from '@/types/group';

export const GroupCard = ({ title, coverColor, adminNickname, groupId }: GropuList) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/group/${groupId}/book`)}>
      <Style.GroupColor color={coverColor} />
      <Style.GroupInfo>
        <Style.GroupTitle>{title}</Style.GroupTitle>
        <Style.GroupPeople>
          <Style.GroupIcon>{USER.GROUP_MD}</Style.GroupIcon>
          <Style.GroupAdminName>{adminNickname}</Style.GroupAdminName>
        </Style.GroupPeople>
      </Style.GroupInfo>
    </Card>
  );
};
