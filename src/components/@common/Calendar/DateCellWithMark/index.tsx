import { MonthStatus } from '@/types/event';
import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { MARK } from '../../../../assets/icons/Mark';
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
  const currentMonth = isCurrentMonth(date);
  const isFirst = day === 0;
  const isLast = day === 6;

  return (
    <Style.DateCell>
      <Style.Date isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={isCurrentMonth(date)} isSelectedWeek={isSelectedWeek}>
        {isSelectedWeek && <Style.selectedWeek isSelectedWeek={isSelectedWeek} isFirst={isFirst} isLast={isLast} />}
        {date.date()}
      </Style.Date>
      <Style.Mark>
        {status?.paymentTypeCountMap.full && currentMonth && !status.paymentTypeCountMap.con && !status.paymentTypeCountMap.non ? <span>{MARK.BLUE}</span> : null}
        {status?.paymentTypeCountMap.con && currentMonth ? <span>{MARK.YELLOW}</span> : null}
        {status?.paymentTypeCountMap.non && currentMonth ? <span>{MARK.RED}</span> : null}
      </Style.Mark>
    </Style.DateCell>
  );
};

export default DateCellWithMark;
