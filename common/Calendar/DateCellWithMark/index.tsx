import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { MARK } from '../../../assets/icons/Mark';
import * as Style from './styles';

interface DateCellWithMarkProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  isSelectedWeek: boolean;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, isSelectedWeek }) => {
  const day = date.day();

  const isFirst = day === 0;
  const isLast = day === 6;

  return (
    <Style.DateCell>
      <Style.Date isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={isCurrentMonth(date)} isSelectedWeek={isSelectedWeek}>
        {isSelectedWeek && <Style.selectedWeek isSelectedWeek={isSelectedWeek} isFirst={isFirst} isLast={isLast} />}
        {date.date()}
      </Style.Date>
      <Style.Mark>
        <span>{MARK.BLUE}</span>
        {/* <span>{MARK.YELLOW}</span> */}
        {/* <span>{MARK.RED}</span> */}
      </Style.Mark>
    </Style.DateCell>
  );
};

export default DateCellWithMark;
