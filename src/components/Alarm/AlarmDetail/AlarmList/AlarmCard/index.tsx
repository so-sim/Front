import { useGetAlarmList } from '@/queries/Notification/useGetAlarmList';
import { NotificationList } from '@/types/notification';
import { useQueryClient } from '@tanstack/react-query';
import * as Style from './styles';

const TextByAlarmType = {};
// 해당 enum에 따라 Text를 정의해준다.

type Props = {
  notificationInfo: NotificationList;
};

const AlarmCard = ({ notificationInfo }: Props) => {
  const { category, date, groupTitle, message, read, notificationId } = notificationInfo;

  return (
    <Style.AlarmCardContainer>
      <Style.Header>
        <Style.Circle $isRead={read} />
        <Style.AlarmTypeText>{category}</Style.AlarmTypeText>
        <Style.DateTitle>{date}</Style.DateTitle>
      </Style.Header>
      <Style.Title>오늘은 벌금 납부일입니다.</Style.Title>
      <Style.GroupText>{groupTitle}</Style.GroupText>
      <Style.Descripttion>설명란</Style.Descripttion>
    </Style.AlarmCardContainer>
  );
};

export default AlarmCard;
