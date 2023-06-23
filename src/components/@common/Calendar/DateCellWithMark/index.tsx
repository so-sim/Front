import { dateStateTest } from '@/store/dateStateTest';
import { MonthStatus } from '@/types/event';
import { handleDate } from '@/utils/handleDate';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { MARK } from '../../../../assets/icons/Mark';
import * as Style from './styles';

interface DateCellWithMarkProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  isSelectedPeriod: boolean;
  status: MonthStatus | undefined;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, isSelectedPeriod, status }) => {
  const [{ startDate, endDate, mode }] = useRecoilState(dateStateTest);
  const { dateToFormmating } = handleDate;
  const currentMonth = isCurrentMonth(date);
  const isFirst = dateToFormmating(startDate) === dateToFormmating(date);
  const isLast = dateToFormmating(endDate) === dateToFormmating(date);

  return (
    <Style.DateCell>
      <Style.Date mode={mode} isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={isCurrentMonth(date)} isSelectedPeriod={isSelectedPeriod}>
        {isSelectedPeriod && <Style.selectedWeek mode={mode} isSelectedPeriod={isSelectedPeriod} isFirst={isFirst} isLast={isLast} />}
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
