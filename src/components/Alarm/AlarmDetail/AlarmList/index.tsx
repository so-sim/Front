import { ALARM } from '@/assets/icons/Alarm';
import { useGetAlarmList } from '@/queries/Notification/useGetAlarmList';
import { useGetAlarmListCount } from '@/queries/Notification/useGetAlarmListCount';
import { useReadAllNotification } from '@/queries/Notification/useReadAllNotification';
import { useReadNotification } from '@/queries/Notification/useReadNotification';
import { alarmInfoState, initAlarmInfoState } from '@/store/alarmInfoState';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';
import { useRecoilState } from 'recoil';
import AlarmCard from './AlarmCard';
import * as Style from './styles';

const AlarmList = () => {
  const { data, fetchNextPage, hasNextPage } = useGetAlarmList(8);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const { mutate: ReadAllNotificationList } = useReadAllNotification();

  const { data: notificationCount } = useGetAlarmListCount();

  const hasItem = data?.pages[0].content.notificationResponseList.length! > 0;

  const hasNotification = notificationCount?.content.count !== 0;

  return (
    <>
      <Style.TitleWrapper>
        <Style.Title>알림</Style.Title>

        <Style.ReadAllAlarmsText $hasItem={hasNotification} onClick={() => ReadAllNotificationList()}>
          모든 알림 읽기
        </Style.ReadAllAlarmsText>
      </Style.TitleWrapper>

      {hasItem ? (
        <Style.AlarmListWrapper>
          {data?.pages.map((page) => page.content.notificationResponseList.map((notificationInfo, index) => <AlarmCard notificationInfo={notificationInfo} key={index} />))}

          <div ref={ref} />
        </Style.AlarmListWrapper>
      ) : (
        <Style.EmptyIconWrapper>
          {ALARM.EMPTYALARM}
          <Style.EmptyText>최근 알림이 없습니다.</Style.EmptyText>
        </Style.EmptyIconWrapper>
      )}
    </>
  );
};

export default AlarmList;
