import { updateNotificationInfo } from '@/api/Group';
import { NotificationInfo } from '@/types/group';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUpdateNotificationInfo = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ notificationInfo }: { notificationInfo: NotificationInfo }) => {
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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notification']);
      },
    },
  );
};
