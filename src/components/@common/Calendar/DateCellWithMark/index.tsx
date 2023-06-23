import { FilterMode } from '@/pages/FineBook/DetailFine';
import { PayMentTpyeCountMap } from '@/types/event';
import { handleDate } from '@/utils/handleDate';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { MARK } from '@/assets/icons/Mark';
import * as Style from './styles';

interface DateCellWithMarkProps {
  date: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  mode: FilterMode;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  isSelectedPeriod: boolean;
  status: PayMentTpyeCountMap | undefined;
}

const DateCellWithMark: FC<DateCellWithMarkProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, isSelectedPeriod, status, startDate, endDate, mode }) => {
  const { dateToFormmating } = handleDate;

  const currentMonth = isCurrentMonth(date);
  const isFirst = dateToFormmating(startDate) === dateToFormmating(date);
  const isLast = dateToFormmating(endDate) === dateToFormmating(date);

  return (
    <Style.DateCell>
      <Style.Date mode={mode} isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={isCurrentMonth(date)} isSelectedPeriod={isSelectedPeriod}>
        {isSelectedPeriod && <Style.SelectedPeriod mode={mode} isSelectedPeriod={isSelectedPeriod} isFirst={isFirst} isLast={isLast} />}
        {date.date()}
      </Style.Date>
      <Style.Mark>
        {status && (status['완납'] && currentMonth && !status['확인중'] && !status['미납'] ? <span>{MARK.BLUE}</span> : null)}
        {status && status['확인중'] && currentMonth ? <span>{MARK.YELLOW}</span> : null}
        {status && status['미납'] && currentMonth ? <span>{MARK.RED}</span> : null}
      </Style.Mark>
    </Style.DateCell>
  );
};

export default DateCellWithMark;
