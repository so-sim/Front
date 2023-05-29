import { ARROW } from '@/assets/icons/Arrow';
import createCalendar from '@/utils/createCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import * as Style from './styles';

interface MiniCalendarProps {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  setOpenDrop: Dispatch<SetStateAction<boolean>>;
}

const MiniCalendar: FC<MiniCalendarProps> = ({ type, setType, setOpenDrop }) => {
  const [baseDate, setBaseDate] = useState(dayjs(type));
  const calendarArray = createCalendar(baseDate);

  const DAY_LIST = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handleDate = (date: Dayjs) => {
    setType(date.format('YYYY.MM.DD'));
    setOpenDrop(false);
  };

  const decreaseMonth = () => {
    setBaseDate((prev) => prev.subtract(1, 'month'));
  };

  const increaseMonth = () => {
    setBaseDate((prev) => prev.add(1, 'month'));
  };

  return (
    <Style.Calendar>
      <Style.DateTitle>
        <Style.Date>{`${baseDate.year()}년 ${baseDate.month() + 1}월`} </Style.Date>
        <Style.ArrowBlock>
          <Style.ArrowIcon onClick={decreaseMonth}>{ARROW.LEFT_MD}</Style.ArrowIcon>
          <Style.ArrowIcon onClick={increaseMonth}>{ARROW.RIGHT_MD}</Style.ArrowIcon>
        </Style.ArrowBlock>
      </Style.DateTitle>
      <Style.DayTitle>
        {DAY_LIST.map((day, i) => (
          <Style.DayType isSunday={i === 0} key={i}>
            {day}
          </Style.DayType>
        ))}
      </Style.DayTitle>
      {calendarArray.map((week) => {
        return (
          <Style.Week key={week[0].format('YYYY.MM.DD')}>
            {week.map((date, i) => {
              return (
                <Style.Day
                  isOtherMonth={date.month() !== baseDate.month()}
                  isSelected={type === date.format('YYYY.MM.DD')}
                  isSunday={i === 0}
                  onClick={() => handleDate(date)}
                  key={date.format('YYYY.MM.DD')}
                >
                  {date.date()}
                </Style.Day>
              );
            })}
          </Style.Week>
        );
      })}
    </Style.Calendar>
  );
};

export default MiniCalendar;
