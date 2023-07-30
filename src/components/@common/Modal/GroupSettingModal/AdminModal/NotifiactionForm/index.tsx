import { Toggle } from '@/components/@common/Toggle';
import { NotificationInfo, NotificationSettingType } from '@/types/group';
import React, { Dispatch, SetStateAction } from 'react';
import * as Style from './styles';
import DaySelector from './DaySelector';
import MonthForm from './MonthForm';
import CommonForm from './CommonForm';

const PERIOD_TYPE_LIST: { label: string; value: NotificationSettingType }[] = [
  { label: '매달', value: 'M' },
  { label: '매주', value: 'W' },
  { label: '매일', value: 'D' },
];

export type DuplicateValues = 'daysOfWeek' | 'ordinalNumbers';

type Props = {
  notificationForm: NotificationInfo;
  setNotificationForm: Dispatch<SetStateAction<NotificationInfo>>;
};

const NotificationForm = ({ notificationForm, setNotificationForm }: Props) => {
  const handleToggleButton = () => {
    setNotificationForm((prev) => ({ ...prev, enableNotification: !prev.enableNotification }));
  };

  const handleNotificationForm = <T,>(type: keyof T, value: T[keyof T]) => {
    setNotificationForm((prev) => ({ ...prev, [type]: value }));
  };

  const controlDuplicateValues = <T,>(list: T[], value: T): T[] => {
    const result = list.includes(value) ? list.filter((day) => day !== value) : [...list, value];
    return result;
  };

  const handleDuplicateValues = <T,>(type: DuplicateValues, value: T) => {
    setNotificationForm((prev) => {
      if (!prev[type]) return prev;
      const values = controlDuplicateValues(prev[type] as T[], value);

      return { ...prev, [type]: values };
    });
  };

  const isSelectedPeriodType = (type: NotificationSettingType) => {
    return notificationForm.settingType === type;
  };

  return (
    <Style.NotificationContainer>
      <Style.ToggleBox>
        <Style.TabTitle>벌금 납부 알림</Style.TabTitle>
        <Toggle toggleState={notificationForm.enableNotification} toggleHandler={handleToggleButton} />
      </Style.ToggleBox>
      <Style.EnabledBox enabled={notificationForm.enableNotification}>
        <Style.StartDateOfNotificationBox>
          <Style.BodySubTitle>이번 달부터</Style.BodySubTitle>
          <Style.Body2SubTitle>알림을 설정해주세요.</Style.Body2SubTitle>
        </Style.StartDateOfNotificationBox>
        <Style.TabContainer>
          <Style.TabTitle>납부일 설정</Style.TabTitle>
          <Style.TabButtonBox>
            {PERIOD_TYPE_LIST.map((type) => {
              return (
                <Style.PeriodTypeButton //
                  key={type.value}
                  isSelected={isSelectedPeriodType(type.value)}
                  onClick={() => handleNotificationForm('settingType', type.value)}
                >
                  {type.label}
                </Style.PeriodTypeButton>
              );
            })}
          </Style.TabButtonBox>
        </Style.TabContainer>
        {/* 매달 */}
        {notificationForm.settingType === 'M' && (
          <MonthForm
            notificationForm={notificationForm} //
            handleNotificationForm={handleNotificationForm}
            handleDuplicateValues={handleDuplicateValues}
          />
        )}
        {/* 매주 */}
        {notificationForm.settingType === 'W' && (
          <>
            <Style.Notice>요일을 선택해주세요.</Style.Notice>
            <DaySelector
              notificationForm={notificationForm} //
              handleDuplicateValues={handleDuplicateValues}
            />
          </>
        )}
        {/* 여기는 공통부분 */}
        <CommonForm
          notificationForm={notificationForm} //
          handleNotificationForm={handleNotificationForm}
        />
      </Style.EnabledBox>
    </Style.NotificationContainer>
  );
};

export default NotificationForm;
