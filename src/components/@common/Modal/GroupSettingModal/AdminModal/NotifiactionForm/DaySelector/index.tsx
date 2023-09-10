import { NotificationInfo } from '@/types/group';
import { DuplicateValues } from '..';
import * as Style from './styles';

const DAY_LIST = [
  { label: '월', value: 'MONDAY' },
  { label: '화', value: 'TUESDAY' },
  { label: '수', value: 'WEDNESDAY' },
  { label: '목', value: 'THURSDAY' },
  { label: '금', value: 'FRIDAY' },
  { label: '토', value: 'SATURDAY' },
  { label: '일', value: 'SUNDAY' },
];

type Props = {
  notificationForm: NotificationInfo;
  handleDuplicateValues: <T extends DuplicateValues, V>(type: T, value: V) => void;
};

const DaySelector = ({ notificationForm, handleDuplicateValues }: Props) => {
  return (
    <Style.DayContainer>
      {DAY_LIST.map(({ label, value }) => {
        return (
          <Style.SelectDayButton //
            key={label}
            isSelected={notificationForm.daysOfWeek?.includes(value)}
            onClick={() => handleDuplicateValues('daysOfWeek', value)}
          >
            {label}
          </Style.SelectDayButton>
        );
      })}
    </Style.DayContainer>
  );
};

export default DaySelector;
