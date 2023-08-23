import { ALARM } from '@/assets/icons/Alarm';
import { useGetAlarmList } from '@/queries/Notification/useGetAlarmList';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
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

  const hasItem = data?.pages[0].content.notificationResponseList.length! > 0;

  return (
    <>
      <Style.TitleWrapper>
        <Style.Title>알람</Style.Title>

        <Style.ReadAllAlarmsText $hasItem={hasItem}>모든 알림 읽기</Style.ReadAllAlarmsText>
      </Style.TitleWrapper>

      {hasItem ? (
        <Style.AlarmListWrapper>
          {data?.pages.map((page) => page.content.notificationResponseList.map((notificationInfo) => <AlarmCard notificationInfo={notificationInfo} />))}

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
