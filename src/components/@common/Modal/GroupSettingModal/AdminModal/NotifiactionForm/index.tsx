import { Toggle } from '@/components/@common/Toggle';
import { NotificationInfo, NotificationSettingType } from '@/types/group';
import * as Style from './styles';
import DaySelector from './DaySelector';
import MonthForm from './MonthForm';
import CommonForm from './CommonForm';
import { NotificationHook } from '@/hooks/admin/useNotificationForm';

const PERIOD_TYPE_LIST: { label: string; value: NotificationSettingType }[] = [
  { label: '매달', value: 'M' },
  { label: '매주', value: 'W' },
  { label: '매일', value: 'D' },
];

export type DuplicateValues = 'daysOfWeek' | 'ordinalNumbers';

type Props = Pick<NotificationHook, 'notificationForm' | 'getNotificationFormAction'>;

const NotificationForm = ({ notificationForm, getNotificationFormAction }: Props) => {
  const {
    isSamePeriodType, //
    handleNotificationForm,
    handleDuplicateNotificationForm,
    isErrorField,
  } = getNotificationFormAction();

  return (
    <Style.NotificationContainer>
      <Style.ToggleBox>
        <Style.TabTitle>벌금 납부 알림</Style.TabTitle>
        <Toggle
          toggleState={notificationForm.enableNotification}
          toggleHandler={() => {
            handleNotificationForm('enableNotification', !notificationForm.enableNotification);
          }}
        />
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
                  isSelected={isSamePeriodType(type.value)}
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
            isErrorField={isErrorField}
            handleNotificationForm={handleNotificationForm}
            handleDuplicateValues={handleDuplicateNotificationForm}
          />
        )}
        {/* 매주 */}
        {notificationForm.settingType === 'W' && (
          <>
            <Style.Notice>
              <div>요일선택</div>
              {isErrorField('daysOfWeek') && <Style.ErrorText>내용을 선택해주세요.</Style.ErrorText>}
            </Style.Notice>
            <DaySelector
              notificationForm={notificationForm} //
              handleDuplicateValues={handleDuplicateNotificationForm}
            />
          </>
        )}
        {/* 여기는 공통부분 */}
        <CommonForm
          isErrorField={isErrorField}
          notificationForm={notificationForm} //
          handleNotificationForm={handleNotificationForm}
        />
      </Style.EnabledBox>
    </Style.NotificationContainer>
  );
};

export default NotificationForm;
