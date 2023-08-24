import { useGetAlarmList } from '@/queries/Notification/useGetAlarmList';
import { useReadNotification } from '@/queries/Notification/useReadNotification';
import { alarmInfoState } from '@/store/alarmInfoState';
import { Situation } from '@/types/event';
import { MessageData, NotificationList, NotificationType, SituationStatus } from '@/types/notification';
import { useQueryClient } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as Style from './styles';

const TextByAlarmType = {};
// 해당 enum에 따라 Text를 정의해준다.

type Props = {
  notificationInfo: NotificationList;
};

const ALARM_TEXT: { [key in NotificationType]: string } = {
  PAYMENT_DATE: '오늘은 벌금 납부일입니다!',
  REQUEST_PAYMENT: '벌금 납부를 잊으셨나요?',
  CHANGE_ADMIN: '총무가 변경되었습니다.',
  CHANGE_FULL_SITUATION: '벌금을 모두 납부했습니다!',
  CHANGE_NONE_SITUATION: '내역이 “납부 전”으로 다시 변경되었습니다.',
  CHANGE_CHECK_SITUATION: '승인대기 중인 내역이 있습니다.',
};

// 이 부분이 고민이다.. 너무 구조적으로 더러워서
const ALARM_DESCRIPTION: {
  [key in NotificationType]: (amout?: number, situation?: SituationStatus | null) => React.ReactNode;
} = {
  PAYMENT_DATE: () => '벌금 내역 확인 후, 벌금을 내주세요!',
  REQUEST_PAYMENT: (amout?: number) => <>벌금 내역 확인 후,${amout}원을 내주세요!</>,
  CHANGE_ADMIN: () => '새로운 총무를 확인해보세요!',
  CHANGE_FULL_SITUATION: (_, afterSituation?: SituationStatus | null) => (
    <>
      벌금 내역이 <AlarmDescription_Situation afterSituation={afterSituation} /> 으로 변경되었습니다.
    </>
  ),
  CHANGE_NONE_SITUATION: (_, afterSituation?: SituationStatus | null) => (
    <>
      벌금 내역이 <AlarmDescription_Situation afterSituation={afterSituation} /> 으로 변경되었습니다.
    </>
  ),
  CHANGE_CHECK_SITUATION: (_, afterSituation?: SituationStatus | null) => (
    <>
      벌금 내역이 <AlarmDescription_Situation afterSituation={afterSituation} /> 으로 변경되었습니다.
    </>
  ),
};

const AlarmCard = ({ notificationInfo }: Props) => {
  const { category, date, groupTitle, eventIdList, groupId, messageData, summary, type, view, notificationId } = notificationInfo;
  const { afterSituation, amount, beforeSituation, nickname } = messageData;

  const navigate = useNavigate();

  const [_, setAlarmEventIdList] = useRecoilState(alarmInfoState);

  const goToAlarmInfo = (eventIdList: number[]) => {
    handleReadNotification();
    setAlarmEventIdList({ alarmEventIdList: [...eventIdList], nickname, beforeSituation, afterSituation, groupId });
    isMobile && navigate(`/m-notification/info`);
  };

  const goToGroupMember = () => {
    handleReadNotification();
    isMobile ? navigate(`/m-group/${groupId}/member`) : navigate(`/group/${groupId}/member`);
  };

  const { mutate: ReadNotification } = useReadNotification();

  const handleReadNotification = () => {
    ReadNotification(notificationId);
  };

  return (
    <Style.AlarmCardContainer onClick={type === 'CHANGE_ADMIN' ? goToGroupMember : () => goToAlarmInfo(eventIdList)}>
      <Style.Header>
        <Style.Circle $isRead={view} />
        <Style.AlarmTypeText>{category}</Style.AlarmTypeText>
        <Style.DateTitle>{date}</Style.DateTitle>
      </Style.Header>
      <Style.Title>{ALARM_TEXT[type]}</Style.Title>
      <Style.GroupText>{nickname ? `${groupTitle}에서 ${nickname}의` : groupTitle}</Style.GroupText>
      <Style.Descripttion>{ALARM_DESCRIPTION[type](amount, afterSituation)}</Style.Descripttion>
    </Style.AlarmCardContainer>
  );
};

export default AlarmCard;

// 합성으로 할까했다.. 각자 타입의 맞는 Description을 생성해서

type SituationProps = {
  afterSituation?: SituationStatus | null;
};

const SITUATION_FORMAT = {
  FULL: '납부완료',
  CHECK: '승인대기',
  NONE: '납부 전',
};

const SITUATION_FORMAT_STYLE: { [key in SituationStatus]: Situation } = {
  FULL: '완납',
  CHECK: '확인중',
  NONE: '미납',
};

const AlarmDescription_Situation = ({ afterSituation }: SituationProps) => {
  return <Style.SituaionBtn situationType={SITUATION_FORMAT_STYLE[afterSituation!]}>{SITUATION_FORMAT[afterSituation!]}</Style.SituaionBtn>;
};
