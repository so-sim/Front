import { ARROW } from '@/assets/icons/Arrow';
import AlarmInfo from '@/components/Alarm/AlarmDetail/AlarmInfo';
import ModalPageLayout from '@/layouts/Mobile/ModalPageLayout';
import { alarmInfoState } from '@/store/alarmInfoState';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const MobileNotificationInfo = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [{ alarmEventIdList, nickname, afterSituation, beforeSituation }, setAlarmIdList] = useRecoilState(alarmInfoState);

  useEffect(() => {
    return () => {
      console.log('alarmInfoWrapper');
    };
  }, []);
  return (
    <ModalPageLayout left={{ icon: ARROW.LEFT, onClick: goBack }} title="">
      <AlarmInfo />
      {/* Alarminfo mutate Success시 navigate로 설정을 해주었음에도 AlarmInfo가 unmount되지않고 몇 차례 다시 실행되는 이슈가 있어서 강제로 Trigger를 줘서 unmount해주었다. */}
    </ModalPageLayout>
  );
};

export default MobileNotificationInfo;
