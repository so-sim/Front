import { ALARM } from '@/assets/icons/Alarm';
import { useGetAlarmListCount } from '@/queries/Notification/useGetAlarmListCount';
import { alarmInfoState } from '@/store/alarmInfoState';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import AlarmDetail from './AlarmDetail';

import * as Style from './styles';

type Props = {
  headerHeight: number;
};

const AlarmComponent = ({ headerHeight }: Props) => {
  const [showAlarmDetail, setShowAlarmDetail] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const [searchParam, _] = useSearchParams();
  // searchParam 사용이유 - 전역상태로 만들려면 isnotification false를 달아줘야한다는 생각에 searchparam으로..

  const [alarmIdList, setAlarmIdList] = useRecoilState(alarmInfoState);

  useEffect(() => {
    if (alarmIdList.groupId) {
      setShowAlarmDetail(true);
    }
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
