import { PayMentTypeCountMap } from '@/types/event';
import { dateToUnixTime, handleDate } from '@/utils/handleDate';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { MARK } from '@/assets/icons/Mark';
import * as Style from './styles';
import { FilterModeTest } from '@/components/DetailFine/DateController/hook/useDateFilter';

interface DateCellWithMarkProps {
  date: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  mode: FilterModeTest;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  isSelectedPeriod: boolean;
  status: PayMentTypeCountMap | undefined;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, isSelectedPeriod, status, startDate, endDate, mode }) => {
  const { dateToFormatting } = handleDate;

  const currentMonth = isCurrentMonth(date);
  const isFirst = dateToFormatting(startDate) === dateToFormatting(date);
  const isLast = dateToFormatting(endDate) === dateToFormatting(date);

  const isOneDay = isFirst && isLast;

  return (
    <Style.DateCell>
      <Style.Date mode={mode} isToday={isToday(date)} isSelectedDate={isSelectedDate(date) || isOneDay} isCurrentMonth={isCurrentMonth(date)} isSelectedPeriod={isSelectedPeriod}>
        {isSelectedPeriod && !isOneDay && <Style.SelectedPeriod mode={mode} isSelectedPeriod={isSelectedPeriod} isFirst={isFirst} isLast={isLast} />}
        {date.date()}
      </Style.Date>
      <Style.Mark>
        {status && currentMonth && (
          <>
            {status['완납'] && !status['확인중'] && !status['미납'] ? <span>{MARK.BLUE}</span> : null}
            {status['확인중'] ? <span>{MARK.YELLOW}</span> : null}
            {status['미납'] ? <span>{MARK.RED}</span> : null}
          </>
        )}
      </Style.Mark>
    </Style.DateCell>
  );
};

export default DateCellWithMark;
