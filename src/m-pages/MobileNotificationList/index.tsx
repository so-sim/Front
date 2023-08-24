import { ARROW } from '@/assets/icons/Arrow';
import AlarmList from '@/components/Alarm/AlarmDetail/AlarmList';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { useNavigate } from 'react-router-dom';

const MobileNotificationList = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="상세내역">
      <AlarmList />
    </ModalPageLayout>
  );
};

export default MobileNotificationList;
