import { ALARM } from '@/assets/icons/Alarm';
import { useGetAlarmListCount } from '@/queries/Notification/useGetAlarmListCount';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import AlarmDetail from './AlarmDetail';

import * as Style from './styles';

type Props = {
  headerHeight: number;
};

const AlarmComponent = ({ headerHeight }: Props) => {
  const [showAlarmDetail, setShowAlarmDetail] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    return () => {
      setShowAlarmDetail(false);
    };
  }, [location]);

  const { data, isLoading } = useGetAlarmListCount();

  const notificationCount = data?.content.count! > 99 ? '99+' : data?.content.count;

  const goToMobileNotificationList = () => {
    navigate(`/m-notification`);
  };

  const handleToggleNotificationModal = () => {
    setShowAlarmDetail((prev) => !prev);
  };

  return (
    <>
      <Style.AlarmIconWrapper
        $isCount={notificationCount !== 0 && !isLoading}
        data-count={notificationCount}
        onClick={isMobile ? goToMobileNotificationList : handleToggleNotificationModal}
      >
        {ALARM.ALARM}
      </Style.AlarmIconWrapper>
      {showAlarmDetail && <AlarmDetail headerHeight={headerHeight} setShowAlarmDetail={setShowAlarmDetail} />}
    </>
  );
};

export default AlarmComponent;
