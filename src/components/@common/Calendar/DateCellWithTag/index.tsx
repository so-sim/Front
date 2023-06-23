import { PayMentTpyeCountMap } from '@/types/event';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { MARK } from '@/assets/icons/Mark';
import * as Style from './styles';

interface DateCellWitTagProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  status: PayMentTpyeCountMap | undefined;
}

const DateCellWithTag: FC<DateCellWitTagProps> = ({ date, isCurrentMonth, isToday, isSelectedDate, status }) => {
  const currentMonth = isCurrentMonth(date);

  return (
    <>
      <Style.DateCell key={date.day()}>
        <Style.Date isToday={isToday(date)} isSelectedDate={isSelectedDate(date)} isCurrentMonth={currentMonth}>
          {date.date()}
        </Style.Date>
        {status && status['미납'] && currentMonth ? (
          <Style.Tag color="red">
            <div>{MARK.RED}</div>
            <span>미납자 있음</span>
            <span>({status['미납']})</span>
          </Style.Tag>
        ) : null}
        {status && status['확인중'] && currentMonth ? (
          <Style.Tag color="orange">
            <div>{MARK.YELLOW}</div>
            <span>관리자 승인 중</span>
            <span>({status['확인중']})</span>
          </Style.Tag>
        ) : null}
        {status && status['완납'] && currentMonth && !(status && status['확인중']) && !(status && status['미납']) ? (
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
