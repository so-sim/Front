import { MonthStatus } from '@/types/event';
import { Dayjs } from 'dayjs';
import React, { FC } from 'react';
import { MARK } from '../../../../assets/icons/Mark';
import * as Style from './styles';

interface DateCellWitTagProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  status: MonthStatus | undefined;
}

const DateCellWithTag: FC<DateCellWitTagProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, status }) => {
  const currentMonth = isCurrentMonth(date);

  return (
    <>
      <Style.DateCell key={date.day()}>
        <Style.Date isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={currentMonth}>
          {date.date()}
        </Style.Date>
        {status?.paymentTypeCountMap.non && currentMonth ? (
          <Style.Tag color="red">
            <div>{MARK.RED}</div>
            <span>미납자 있음</span>
            <span>({status.paymentTypeCountMap.non})</span>
          </Style.Tag>
        ) : null}
        {status?.paymentTypeCountMap.con && currentMonth ? (
          <Style.Tag color="orange">
            <div>{MARK.YELLOW}</div>
            <span>관리자 승인 중</span>
            <span>({status.paymentTypeCountMap.con})</span>
          </Style.Tag>
        ) : null}
        {status?.paymentTypeCountMap.full && currentMonth && !status.paymentTypeCountMap.con && !status.paymentTypeCountMap.non ? (
          <Style.Tag color="blue">
            <div>{MARK.BLUE}</div>
            <span>모두 완납</span>
          </Style.Tag>
        ) : null}
      </Style.DateCell>
    </>
  );
};

export default DateCellWithTag;
