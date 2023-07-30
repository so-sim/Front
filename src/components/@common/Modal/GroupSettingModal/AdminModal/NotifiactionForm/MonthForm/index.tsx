import { ARROW } from '@/assets/icons/Arrow';
import { NotificationInfo } from '@/types/group';
import { DuplicateValues } from '..';
import * as Style from './styles';
import DaySelector from '../DaySelector';

type MonthFormProps<T, V> = {
  notificationForm: NotificationInfo;
  handleNotificationForm: <T extends keyof NotificationInfo>(type: T, value: NotificationInfo[T]) => void;
  handleDuplicateValues: <T extends DuplicateValues, V>(type: T, value: V) => void;
};

const ORDINARY_LIST = [
  { label: '첫 번째', value: 1 },
  { label: '두 번째', value: 2 },
  { label: '세 번째', value: 3 },
  { label: '네 번째', value: 4 },
  { label: '다섯 번째', value: 5 },
  { label: '마지막', value: 6 },
];

const MonthForm = <T extends NotificationInfo, V extends T[DuplicateValues]>({ notificationForm, handleNotificationForm, handleDuplicateValues }: MonthFormProps<T, V>) => {
  const createFixedCalendar = () => {
    const result = Array.from({ length: 5 }, () => [] as (number | null)[]);
    for (let i = 0; i < 35; i++) {
      result[Math.floor(i / 7)].push(i < 31 ? i + 1 : null);
    }

    return result;
  };
  return (
    <>
      <Style.MonthlySelectTitle //
        onClick={() => handleNotificationForm('monthSettingType', 'SIMPLE_DATE')}
      >
        날짜로 선택하기 {ARROW.DOWN_LG}
      </Style.MonthlySelectTitle>
      {notificationForm.monthSettingType === 'SIMPLE_DATE' && (
        <div>
          <Style.Notice>31일로 설정 (말일로 설정됩니다)</Style.Notice>
          <Style.CalendarBlock>
            {createFixedCalendar().map((week, i) => {
              return (
                <Style.WeekBlock key={i}>
                  {week.map((date, i) => {
                    return (
                      <Style.DateButton //
                        isSelected={notificationForm.sendDay === date}
                        key={i}
                        onClick={() => {
                          date !== null && handleNotificationForm('sendDay', date);
                        }}
                      >
                        {date}
                      </Style.DateButton>
                    );
                  })}
                </Style.WeekBlock>
              );
            })}
          </Style.CalendarBlock>
        </div>
      )}

      {/* 매달>요일로 선택하기 */}
      <Style.MonthlySelectTitle //
        onClick={() => handleNotificationForm('monthSettingType', 'WEEK')}
      >
        요일로 선택하기 {ARROW.DOWN_LG}
      </Style.MonthlySelectTitle>
      {notificationForm.monthSettingType === 'WEEK' && (
        <div>
          <Style.Notice>몇 번째 요일인가요?</Style.Notice>
          <Style.BodyTitle>몇 번째</Style.BodyTitle>
          <Style.OrdinalNumberConatiner>
            {ORDINARY_LIST.map(({ label, value }) => {
              return (
                <Style.SelectDayButton //
                  key={label}
                  isSelected={notificationForm.ordinalNumbers?.includes(value)}
                  onClick={() => handleDuplicateValues('ordinalNumbers', value)}
                >
                  {label}
                </Style.SelectDayButton>
              );
            })}
          </Style.OrdinalNumberConatiner>
          <Style.BodyTitle>무슨 요일</Style.BodyTitle>
          <DaySelector
            notificationForm={notificationForm} //
            handleDuplicateValues={handleDuplicateValues}
          />
        </div>
      )}
    </>
  );
};

export default MonthForm;
