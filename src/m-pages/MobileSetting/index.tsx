import { ARROW } from '@/assets/icons/Arrow';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useGroupDetail } from '@/queries/Group';
import { useNavigate, useParams } from 'react-router-dom';
import * as Style from './styles';

type SettingType = 'group' | 'alarm' | 'user-group';
type Role = 'admin' | 'member';

const SETTING_LIST: { value: string; type: SettingType; role: Role }[] = [
  { value: '사용자 설정', type: 'user-group', role: 'member' },
  { value: '사용자 설정', type: 'group', role: 'admin' },
  { value: '알림 설정', type: 'alarm', role: 'admin' },
];

const MobileSetting = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const { data: groupData } = useGroupDetail(Number(groupId));
  const isAdmin = groupData?.content.isAdmin;
  const filteredSettingList = SETTING_LIST.filter((item) => (isAdmin ? item.role === 'admin' : item.role === 'member'));

  const goBack = () => {
    navigate(-1);
  };

  const moveToSettingPage = (type: SettingType) => {
    navigate(`/m-group/${groupId}/group-setting/${type}`);
  };

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="모임 설정">
      <ul style={{ marginTop: '20px' }}>
        {filteredSettingList.map(({ type, value }) => (
          <Style.ListItem key={value} onClick={() => moveToSettingPage(type)}>
            {value}
          </Style.ListItem>
        ))}
      </ul>
    </ModalPageLayout>
  );
};

export default MobileSetting;
