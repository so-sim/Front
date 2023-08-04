import { Card } from '..';
import * as Style from './styles';
import { USER } from '@/assets/icons/User';
import { GroupList } from '@/types/group';

type Props = GroupList & { onClick: () => void; size?: 'sm' | 'md' };

export const GroupCard = ({ title, coverColor, adminNickname, onClick, size = 'md' }: Props) => {
  return (
    <Card size={size} onClick={onClick}>
      <Style.GroupColor color={coverColor} size={size} />
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
