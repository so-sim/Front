import { updateNotificationInfo } from '@/api/Group';
import { NotificationInfo } from '@/types/group';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useUpdateNotificationInfo = (groupId: number) => {
  return useMutation(({ notificationInfo }: { notificationInfo: NotificationInfo }) => {
    const { sendDay, monthSettingType, ordinalNumbers, daysOfWeek, ...basicFeilds } = notificationInfo;
    if (notificationInfo.settingType === 'M' && monthSettingType === 'SIMPLE_DATE') {
      return updateNotificationInfo(groupId, { ...basicFeilds, monthSettingType, sendDay });
    }
    if (notificationInfo.settingType === 'M' && monthSettingType === 'WEEK') {
      return updateNotificationInfo(groupId, { ...basicFeilds, monthSettingType, ordinalNumbers, daysOfWeek });
    }
    if (notificationInfo.settingType === 'W') {
      return updateNotificationInfo(groupId, { ...basicFeilds, daysOfWeek });
    }
    if (notificationInfo.settingType === 'D') {
      return updateNotificationInfo(groupId, { ...basicFeilds });
    }

    throw new Error('NotificationInfo>settingType이 잘못 설정되었습니다.');
  });
};
