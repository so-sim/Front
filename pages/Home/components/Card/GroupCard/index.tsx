import { Card } from '..';
import * as Style from './style';
import { USER } from '@/assets/icons/User';
import { useNavigate } from 'react-router-dom';
import { CoverGroupInfo } from '@/api/Group';

export const GroupCard = ({ title, coverColor, admin }: CoverGroupInfo) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/group/1`)}>
      <Style.GroupColor color={coverColor} />
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
