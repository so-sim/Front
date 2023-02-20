import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { MARK } from '../../../assets/icons/Mark';
import * as Style from './styles';

interface DateCellWithMarkProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday }) => {
  return (
    <>
      <Style.DateCell isCurrentMonth={isCurrentMonth(date)}>
        <p>{date.date()}</p>
        <Style.TodayMark isToday={isToday(date)} />
        <Style.Mark>
          <span>{MARK.BLUE}</span>
          {/* <span>{MARK.YELLOW}</span> */}
          {/* <span>{MARK.RED}</span> */}
        </Style.Mark>
      </Style.DateCell>
    </>
  );
};

export default DateCellWithMark;
