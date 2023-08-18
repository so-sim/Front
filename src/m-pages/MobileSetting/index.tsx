import { ARROW } from '@/assets/icons/Arrow';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useNavigate, useParams } from 'react-router-dom';
import * as Style from './styles';

type SettingType = 'group' | 'alarm';

const SETTING_LIST: { value: string; type: SettingType }[] = [
  { value: '사용자 설정', type: 'group' },
  { value: '알림 설정', type: 'alarm' },
];

const MobileSetting = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  const moveToSettingPage = (type: SettingType) => {
    navigate(`/m-group/${groupId}/group-setting/${type}`);
  };

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="모임 설정">
      <ul style={{ marginTop: '20px' }}>
        {SETTING_LIST.map(({ type, value }) => (
          <Style.ListItem key={value} onClick={() => moveToSettingPage(type)}>
            {value}
          </Style.ListItem>
        ))}
      </ul>
    </ModalPageLayout>
  );
};

export default MobileSetting;
