import { useNotificationInfo, useUpdateNotificationInfo } from '@/queries/Group';
import { DayType, NotificationInfo, NotificationSettingType } from '@/types/group';
import { convertTimeFormat, covertToTime } from '@/utils/convertFormat';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFormState from '../Shared/useFormState';

const initialValue: NotificationInfo = {
  enableNotification: false,
  settingType: 'M',
  repeatCycle: 1,
  startDate: dayjs().format('YYYY-MM-DD'),
  sendTime: '19:00',
  monthSettingType: 'SIMPLE_DATE',
  sendDay: dayjs().date(),
  ordinalNumbers: [1],
  daysOfWeek: ['MONDAY'],
};

export type DuplicateValues = 'daysOfWeek' | 'ordinalNumbers';

export type NotificationFormAction<T = NotificationInfo> = {
  initNotificationForm: VoidFunction;
  submitNotificationForm: () => Promise<any>;
  handleNotificationForm: (type: keyof T, value: T[keyof T]) => void;
  handleDuplicateNotificationForm: <D extends DuplicateValues, V>(type: D, value: V) => void;
  isSamePeriodType: (type: NotificationSettingType) => boolean;
  isErrorField: (field: keyof T) => boolean;
  getNotificationDescription: () => { firstLine: string; secondLine: string; thirdLine?: string };
  getOneLineNotificationDescription: () => string;
};

export type NotificationHook = {
  notificationForm: NotificationInfo;
  isValidNotificationForm: boolean;
  notificationInfoLoading: boolean;
  notificationErrorList: Array<keyof NotificationInfo>;
  getNotificationFormAction: () => NotificationFormAction;
};

const useNotificationForm = (): NotificationHook => {
  const { groupId } = useParams();

  const { data: notificationInfo } = useNotificationInfo(Number(groupId));
  const { mutateAsync: updateNotificationInfo, isLoading } = useUpdateNotificationInfo(Number(groupId));

  const { formState, isValid, setFormState } = useFormState(initialValue, getIsValidNotificationForm);
  const [errorList, setErrorList] = useState<Array<keyof NotificationInfo>>([]);

  const submitForm = () => {
    if (isLoading) throw new Error('로딩중...');
    if (errorList.length === 0) {
      if (formState.daysOfWeek?.length !== 0) {
        return updateNotificationInfo({ notificationInfo: { ...formState, daysOfWeek: formState.daysOfWeek?.filter((day) => day !== '') } });
      }
      return updateNotificationInfo({ notificationInfo: formState });
    }
    throw new Error('알림 설정 목록을 채워주세요');
  };

  const initForm = () => {
    if (notificationInfo?.content !== null) {
      setFormState((prev) => ({ ...prev, ...notificationInfo?.content }));
    } else {
      setFormState(initialValue);
    }
  };

  const initFormWithoutSettingType = () => {
    const { settingType, monthSettingType, enableNotification, ...rest } = initialValue;
    setFormState((prev) => ({ ...prev, ...rest }));
  };

  const handleForm = <T>(type: keyof T, value: T[keyof T]) => {
    setFormState((prev) => ({ ...prev, [type]: value }));
  };

  /**
   * 같은 값이 배열에 들어있을 때에는 값을 제거하고, 없다면 추가하는 함수
   */
  const handleDuplicateForm = <T>(type: DuplicateValues, value: T) => {
    setFormState((prev) => {
      if (!prev[type]) return prev;
      const values = controlDuplicateValues(prev[type] as T[], value);

      return { ...prev, [type]: values };
    });
  };

  const isSameType = (type: NotificationSettingType) => {
    return formState.settingType === type;
  };

  const getNotificationDescription = () => {
    if (!notificationInfo?.content || notificationInfo?.content.enableNotification === false) {
      const firstLine = '이번 달부터 ';
      const secondLine = '알림을 설정해주세요.';
      return { firstLine, secondLine };
    }

    const { settingType, repeatCycle, startDate, sendTime, monthSettingType, sendDay, ordinalNumbers, daysOfWeek } = notificationInfo?.content;

    const startMonth = dayjs(startDate).month() + 1;
    const startDay = dayjs(startDate).date();

    const isRegularCycle = repeatCycle === 1;

    const unitType = {
      M: '달',
      W: '주',
      D: '일',
    };

    const unitType_2 = {
      M: '개월',
      W: '주',
      D: '일',
    };

    const dayType = {
      MONDAY: '월',
      TUESDAY: '화',
      WEDNESDAY: '수',
      THURSDAY: '목',
      FRIDAY: '금',
      SATURDAY: '토',
      SUNDAY: '일',
    };

    const weekType: Record<number, string> = {
      1: '첫 번째',
      2: '두 번째',
      3: '세 번째',
      4: '네 번째',
      5: '다섯 번째',
      6: '마지막',
    };

    const dayList = daysOfWeek?.map((day) => dayType[day as DayType]).join(',');
    const weekList = ordinalNumbers?.map((ordinalNumber) => weekType[ordinalNumber]).join(',');

    const startNotificationDate = `${startMonth}월 ${startDay}일부터`;
    const notificationCycle = isRegularCycle ? `매${unitType[settingType]}` : `${repeatCycle}${unitType_2[settingType]}마다`;

    const regularCycle = `${isRegularCycle ? `${notificationCycle} ` : ''}`;

    const covertedSendTime = covertToTime(sendTime);

    const firstLine = `${startNotificationDate} ${!isRegularCycle ? `(${notificationCycle})` : ''}`;
    const secondDayLine = `${regularCycle}${covertedSendTime} 에 알림 발송`;
    const secondWeekLine = `${regularCycle}${dayList}요일`;
    const thirdWeekLine = `${covertedSendTime} 에 알림 발송`;
    const secondMonthLineByDate = `${regularCycle}${sendDay}일 ${covertedSendTime} 에 알림 발송`;
    const secondMonthLineByDay = `${regularCycle}${weekList} ${dayList}요일`;
    const thirdMonthLineByDay = `${covertedSendTime} 에 알림 발송`;

    if (settingType === 'W') {
      return { firstLine, secondLine: secondWeekLine, thirdLine: thirdWeekLine };
    }
    if (settingType === 'D') {
      return { firstLine, secondLine: secondDayLine };
    }
    if (settingType === 'M' && monthSettingType === 'SIMPLE_DATE') {
      return { firstLine, secondLine: secondMonthLineByDate };
    }
    if (settingType === 'M' && monthSettingType === 'WEEK') {
      return { firstLine, secondLine: secondMonthLineByDay, thirdLine: thirdMonthLineByDay };
    }
    return { firstLine: '', secondLine: '' };
  };

  const getOneLineNotificationDescription = () => {
    if (!notificationInfo?.content || notificationInfo?.content.enableNotification === false) {
      return '모임 설정에서 알림을 등록해보세요!';
    }

    const { settingType, repeatCycle, monthSettingType, sendDay, ordinalNumbers, daysOfWeek } = notificationInfo?.content;
    const isRegularCycle = repeatCycle === 1;

    const unitType = {
      M: '달',
      W: '주',
      D: '일',
    };

    const unitType_2 = {
      M: '개월',
      W: '주',
      D: '일',
    };

    const dayType = {
      MONDAY: '월',
      TUESDAY: '화',
      WEDNESDAY: '수',
      THURSDAY: '목',
      FRIDAY: '금',
      SATURDAY: '토',
      SUNDAY: '일',
    };

    const weekType: Record<number, string> = {
      1: '첫 번째',
      2: '두 번째',
      3: '세 번째',
      4: '네 번째',
      5: '다섯 번째',
      6: '마지막',
    };

    const dayList = daysOfWeek?.map((day) => dayType[day as DayType]).join(',');
    const weekList = ordinalNumbers?.map((ordinalNumber) => weekType[ordinalNumber]).join(',');

    const notificationCycle = isRegularCycle ? `매${unitType[settingType]}` : `${repeatCycle}${unitType_2[settingType]}마다`;

    const regularCycle = `${isRegularCycle ? `${notificationCycle} ` : ''}`;

    if (settingType === 'W') {
      return `${regularCycle}${dayList} ${!isRegularCycle ? `(${notificationCycle})` : ''}`;
    }
    if (settingType === 'D') {
      return `${notificationCycle}`;
    }
    if (settingType === 'M' && monthSettingType === 'SIMPLE_DATE') {
      return `${regularCycle}${sendDay}일 ${!isRegularCycle ? `(${notificationCycle})` : ''}`;
    }
    if (settingType === 'M' && monthSettingType === 'WEEK') {
      return `${regularCycle}${weekList} ${dayList}요일 ${!isRegularCycle ? `(${notificationCycle})` : ''}`;
    }
    return '';
  };

  const getFormAction = () => {
    return {
      initNotificationForm: initForm,
      submitNotificationForm: submitForm, //
      handleNotificationForm: handleForm,
      handleDuplicateNotificationForm: handleDuplicateForm,
      isSamePeriodType: isSameType,
      isErrorField,
      getNotificationDescription,
      getOneLineNotificationDescription,
    };
  };

  const isErrorField = (field: keyof NotificationInfo) => {
    return errorList.includes(field);
  };

  useEffect(() => {
    if (notificationInfo?.content !== null) {
      setFormState((prev) => ({ ...prev, ...notificationInfo?.content }));
    }
  }, [notificationInfo]);

  useEffect(() => {
    setErrorList(getErrorFieldList(formState));
  }, [formState]);

  useEffect(() => {
    initFormWithoutSettingType();
  }, [formState.settingType, formState.monthSettingType]);

  return {
    notificationForm: formState,
    isValidNotificationForm: isValid,
    notificationInfoLoading: isLoading,
    notificationErrorList: errorList,
    getNotificationFormAction: getFormAction,
  };
};

export default useNotificationForm;

export const getErrorFieldList = (notificationForm: NotificationInfo): Array<keyof NotificationInfo> => {
  const {
    repeatCycle,
    startDate,
    settingType,
    monthSettingType,
    ordinalNumbers, //
    daysOfWeek,
  } = notificationForm;
  const result: Array<keyof NotificationInfo> = [];

  if (repeatCycle < 1 || repeatCycle > 100) result.push('repeatCycle');
  if (!dayjs(startDate).isValid() || startDate.length < 10) result.push('startDate');

  if (settingType === 'M' && monthSettingType === 'WEEK') {
    if (!ordinalNumbers || !ordinalNumbers?.length) {
      result.push('ordinalNumbers');
    }
    if (!daysOfWeek || !daysOfWeek?.length) {
      result.push('daysOfWeek');
    }
  }

  if (settingType === 'W') {
    if (!daysOfWeek || !daysOfWeek?.length) {
      result.push('daysOfWeek');
    }
  }

  return result;
};

export const getIsValidNotificationForm = (notificationForm: NotificationInfo) => {
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
      (!ordinalNumbers || !ordinalNumbers?.length || !daysOfWeek || !daysOfWeek?.length || ordinalNumbers.length > 2) //
    ) {
      return false;
    }
  }
  if (settingType === 'W') {
    if (!daysOfWeek || !daysOfWeek?.length) return false;
  }
  return true;
};

const controlDuplicateValues = <T>(list: T[], value: T): T[] => {
  const result = list.includes(value) ? list.filter((day) => day !== value) : [...list, value];
  return result;
};
