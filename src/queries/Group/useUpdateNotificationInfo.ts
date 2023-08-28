import { updateNotificationInfo } from '@/api/Group';
import { NotificationInfo } from '@/types/group';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DayType } from '@/types/group';

const DayOfWeek: Record<DayType, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

export const useUpdateNotificationInfo = (groupId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ notificationInfo }: { notificationInfo: NotificationInfo }) => {
      const { sendDay, monthSettingType, ordinalNumbers, daysOfWeek, ...basicFeilds } = notificationInfo;
      if (notificationInfo.settingType === 'M' && monthSettingType === 'SIMPLE_DATE') {
        return updateNotificationInfo(groupId, { ...basicFeilds, monthSettingType, sendDay });
      }
      if (notificationInfo.settingType === 'M' && monthSettingType === 'WEEK') {
        ordinalNumbers?.sort((a, b) => a - b);
        daysOfWeek?.sort((a, b) => DayOfWeek[a as DayType] - DayOfWeek[b as DayType]);

        return updateNotificationInfo(groupId, { ...basicFeilds, monthSettingType, ordinalNumbers, daysOfWeek });
      }
      if (notificationInfo.settingType === 'W') {
        daysOfWeek?.sort((a, b) => DayOfWeek[a as DayType] - DayOfWeek[b as DayType]);
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
