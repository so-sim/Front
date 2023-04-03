import { MonthStatus } from '@/types/event';
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
  status: MonthStatus | undefined;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, isSelectedWeek, status }) => {
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
        {status?.paymentTypeCountMap.con && <span>{MARK.BLUE}</span>}
        {status?.paymentTypeCountMap.full && <span>{MARK.YELLOW}</span>}
        {status?.paymentTypeCountMap.non && <span>{MARK.RED}</span>}
      </Style.Mark>
    </Style.DateCell>
  );
};

export default DateCellWithMark;
