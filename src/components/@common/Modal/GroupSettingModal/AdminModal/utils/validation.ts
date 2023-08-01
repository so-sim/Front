import { COLORS } from '@/constants/Group';
import { NotificationInfo } from '@/types/group';
import { checkCountChar } from '@/utils/validation';
import dayjs from 'dayjs';
import { GroupFormData } from '..';

export const isValidGroupForm = (groupForm: GroupFormData) => {
  const { title, nickname, type, coverColor } = groupForm;
  if (checkCountChar(title)) return false;
  if (checkCountChar(nickname)) return false;
  if (type === '') return false;
  if (!COLORS.includes(coverColor)) return false;
  return true;
};

export const isValidNotificationForm = (notificationForm: NotificationInfo) => {
  const {
    enableNotification,
    settingType,
    repeatCycle,
    startDate,
    sendTime,
    monthSettingType,
    sendDay,
    ordinalNumbers, //
    daysOfWeek,
  } = notificationForm;

  if (enableNotification === false) return true;

  if (repeatCycle < 1 || repeatCycle > 100) return false;
  if (!dayjs(startDate).isValid()) return false;
  if (!sendTime) return false;
  if (settingType === 'M') {
    if (monthSettingType === 'SIMPLE_DATE' && !sendDay) return false;
    if (
      monthSettingType === 'WEEK' &&
      (!ordinalNumbers || !ordinalNumbers?.length || !daysOfWeek || !daysOfWeek?.length) //
    ) {
      return false;
    }
  }
  if (settingType === 'W') {
    if (!daysOfWeek || !daysOfWeek?.length) return false;
  }
  return true;
};
