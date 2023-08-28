import { Toggle } from '@/components/@common/Toggle';
import { NotificationSettingType } from '@/types/group';
import * as Style from './styles';
import DaySelector from './DaySelector';
import MonthForm from './MonthForm';
import CommonForm from './CommonForm';
import { NotificationHook } from '@/hooks/Group/useNotificationForm';
import { SYSTEM } from '@/assets/icons/System';
import { Tooltip } from '@/components/@common/Tooltip';
import Notification from '@/components/@common/Tooltip/Notification';

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
    getNotificationDescription,
    initFormWithoutSettingType,
  } = getNotificationFormAction();

  const { firstLine, secondLine, thirdLine } = getNotificationDescription();

  return (
    <Style.NotificationContainer>
      <Style.ToggleBox>
        <Style.TabTitle>
          <div>벌금 납부 알림</div>
          <Tooltip
            title="벌금 납부 알림이란?"
            contents={Notification}
            width={312}
            location="BOTTOM"
            top="32px"
            left={'-106px'}
            messageBox={{ left: '106px', top: '-10px' }}
            trigger={<div style={{ height: '20px' }}>{SYSTEM.TOOLTIP_MD}</div>}
          />
        </Style.TabTitle>
        <Toggle
          toggleState={notificationForm.enableNotification}
          toggleHandler={() => {
            handleNotificationForm('enableNotification', !notificationForm.enableNotification);
          }}
        />
      </Style.ToggleBox>
      <Style.EnabledBox enabled={notificationForm.enableNotification}>
        <Style.StartDateOfNotificationBox>
          <Style.BodySubTitle>{firstLine}</Style.BodySubTitle>
          <Style.Body2SubTitle>{secondLine}</Style.Body2SubTitle>
          {thirdLine ? <Style.Body2SubTitle>{thirdLine}</Style.Body2SubTitle> : <div style={{ height: '24px' }} />}
        </Style.StartDateOfNotificationBox>
        <Style.TabContainer>
          <Style.TabTitle>납부일 설정</Style.TabTitle>
          <Style.TabButtonBox>
            {PERIOD_TYPE_LIST.map((type) => {
              return (
                <Style.PeriodTypeButton //
                  key={type.value}
                  isSelected={isSamePeriodType(type.value)}
                  onClick={() => {
                    //이거 변경할 때에만 초기화
                    initFormWithoutSettingType();
                    handleNotificationForm('settingType', type.value);
                  }}
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
