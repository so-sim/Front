import { DayOfWeek } from '@/queries/Group/useUpdateNotificationInfo';
import { DayType, NotificationInfo } from '@/types/group';

//매달>요일 선택하기에서 몇번째, 요일을 선택했을 때 올바른 순서로 정렬해주는 함수
export const sortNotificationForm = (notificationForm: NotificationInfo) => {
  const { ordinalNumbers, daysOfWeek } = notificationForm;
  const sortedNotificationForm = {
    ordinalNumbers: ordinalNumbers?.sort((a, b) => a - b),
    daysOfWeek: daysOfWeek?.sort((a, b) => DayOfWeek[a as DayType] - DayOfWeek[b as DayType]),
  };
  return { ...notificationForm, ...sortedNotificationForm };
};
