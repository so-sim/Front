import { useNotificationInfo, useUpdateNotificationInfo } from '@/queries/Group';
import { NotificationInfo, NotificationSettingType } from '@/types/group';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useForm from '../shared/useForm';

const initialValue: NotificationInfo = {
  enableNotification: true,
  settingType: 'M',
  repeatCycle: 1,
  startDate: dayjs().format('YYYY.MM.DD'),
  sendTime: '19:00',
  monthSettingType: 'SIMPLE_DATE',
  sendDay: dayjs().date(),
  ordinalNumbers: [],
  daysOfWeek: [],
};

export type DuplicateValues = 'daysOfWeek' | 'ordinalNumbers';

export type NotificationFormAction<T = NotificationInfo> = {
  initNotificationForm: VoidFunction;
  submitNotificationForm: () => Promise<any>;
  handleNotificationForm: (type: keyof T, value: T[keyof T]) => void;
  handleDuplicateNotificationForm: <D extends DuplicateValues, V>(type: D, value: V) => void;
  isSamePeriodType: (type: NotificationSettingType) => boolean;
  isErrorField: (field: keyof T) => boolean;
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

  const { form, isValid, setForm } = useForm(initialValue, isValidNotificationForm);
  const [errorList, setErrorList] = useState<Array<keyof NotificationInfo>>([]);

  const submitForm = () => {
    if (isLoading) throw new Error('로딩중...');
    if (errorList.length === 0) {
      return updateNotificationInfo({ notificationInfo: form });
    }
    throw new Error('알림 설정 목록을 채워주세요');
  };

  const initForm = () => {
    if (notificationInfo?.content !== null) {
      setForm((prev) => ({ ...prev, ...notificationInfo?.content }));
    } else {
      setForm(initialValue);
    }
  };

  const initFormWithoutSettingType = () => {
    const { settingType, ...rest } = initialValue;
    setForm((prev) => ({ ...prev, ...rest }));
  };

  const handleForm = <T>(type: keyof T, value: T[keyof T]) => {
    setForm((prev) => ({ ...prev, [type]: value }));
  };

  /**
   * 같은 값이 배열에 들어있을 때에는 값을 제거하고, 없다면 추가하는 함수
   */
  const handleDuplicateForm = <T>(type: DuplicateValues, value: T) => {
    setForm((prev) => {
      if (!prev[type]) return prev;
      const values = controlDuplicateValues(prev[type] as T[], value);

      return { ...prev, [type]: values };
    });
  };

  const isSameType = (type: NotificationSettingType) => {
    return form.settingType === type;
  };

  const getFormAction = () => {
    return {
      initNotificationForm: initForm,
      submitNotificationForm: submitForm, //
      handleNotificationForm: handleForm,
      handleDuplicateNotificationForm: handleDuplicateForm,
      isSamePeriodType: isSameType,
      isErrorField,
    };
  };

  const isErrorField = (field: keyof NotificationInfo) => {
    return errorList.includes(field);
  };

  useEffect(() => {
    if (notificationInfo?.content !== null) {
      setForm((prev) => ({ ...prev, ...notificationInfo?.content }));
    }
  }, [notificationInfo]);

  useEffect(() => {
    setErrorList(getErrorFieldList(form));
  }, [form]);

  useEffect(() => {
    initFormWithoutSettingType();
  }, [form.settingType]);

  return {
    notificationForm: form,
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

const controlDuplicateValues = <T>(list: T[], value: T): T[] => {
  const result = list.includes(value) ? list.filter((day) => day !== value) : [...list, value];
  return result;
};
