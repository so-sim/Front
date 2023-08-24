import { ALARM } from '@/assets/icons/Alarm';
import { useGetAlarmListCount } from '@/queries/Notification/useGetAlarmListCount';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlarmDetail from './AlarmDetail';

import * as Style from './styles';

type Props = {
  headerHeight: number;
};

const AlarmComponent = ({ headerHeight }: Props) => {
  const [showAlarmDetail, setShowAlarmDetail] = useState(false);

  const location = useLocation();
  useEffect(() => {
    return () => {
      setShowAlarmDetail(false);
    };
  }, [location]);

  const { data } = useGetAlarmListCount();

  const notificationCount = data?.content.count! > 99 ? '99+' : data?.content.count;

  return (
    <>
      <Style.AlarmIconWrapper $isCount={notificationCount !== 0} data-count={notificationCount} onClick={() => setShowAlarmDetail((prev) => !prev)}>
        {ALARM.ALARM}
      </Style.AlarmIconWrapper>
      {showAlarmDetail && <AlarmDetail headerHeight={headerHeight} setShowAlarmDetail={setShowAlarmDetail} />}
    </>
  );
};

export default AlarmComponent;
