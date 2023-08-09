import { ARROW } from '@/assets/icons/Arrow';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type SettingType = 'group' | 'alarm';

const SETTING_LIST: { label: string; value: SettingType }[] = [
  { label: '사용자 설정', value: 'group' },
  { label: '알림 설정', value: 'alarm' },
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
      <div style={{ margin: '20px 16px 0 16px' }}>
        {SETTING_LIST.map((setting) => (
          <div key={setting.value} onClick={() => moveToSettingPage(setting.value)}>
            {setting.label}
          </div>
        ))}
      </div>
    </ModalPageLayout>
  );
};

export default MobileSetting;
