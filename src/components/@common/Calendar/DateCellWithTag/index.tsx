import { PayMentTypeCountMap } from '@/types/event';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { MARK } from '@/assets/icons/Mark';
import * as Style from './styles';

interface DateCellWitTagProps {
  date: Dayjs;
  isCurrentMonth: (date: Dayjs) => boolean;
  isToday: (date: Dayjs) => boolean;
  isSelectedDate: (date: Dayjs) => boolean;
  status: PayMentTypeCountMap | undefined;
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
            <span>납부 전</span>
            <span>({status['미납']})</span>
          </Style.Tag>
        ) : null}
        {status && status['확인중'] && currentMonth ? (
          <Style.Tag color="orange">
            <div>{MARK.YELLOW}</div>
            <span>총무 승인대기</span>
            <span>({status['확인중']})</span>
          </Style.Tag>
        ) : null}
        {status && status['완납'] && currentMonth && !(status && status['확인중']) && !(status && status['미납']) ? (
          <Style.Tag color="blue">
            <div>{MARK.BLUE}</div>
            <span>모두 납부</span>
          </Style.Tag>
        ) : null}
      </Style.DateCell>
    </>
  );
};

export default DateCellWithTag;
