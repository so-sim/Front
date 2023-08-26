import { ARROW } from '@/assets/icons/Arrow';
import AlarmList from '@/components/Alarm/AlarmDetail/AlarmList';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const MobileNotificationList = () => {
  const navigate = useNavigate();

  const [alarm, setAlarmIdList] = useRecoilState(alarmInfoState);

  const goBack = () => {
    navigate(-1);
    setAlarmIdList(initAlarmInfoState);
  };

  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="상세내역">
      <AlarmList />
    </ModalPageLayout>
  );
};

export default MobileNotificationList;
