import { ARROW } from '@/assets/icons/Arrow';
import AlarmInfo from '@/components/Alarm/AlarmDetail/AlarmInfo';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useNavigate } from 'react-router-dom';

const MobileNotificationInfo = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="">
      <AlarmInfo />
    </ModalPageLayout>
  );
};

export default MobileNotificationInfo;
