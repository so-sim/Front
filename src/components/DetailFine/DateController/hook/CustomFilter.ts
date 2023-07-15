import { DateState } from '@/store/dateState';
import dayjs from 'dayjs';
export class CustomFilter {
  increaseDateByMode = (calendarDate: DateState): DateState => {
    const nextDate = dayjs(calendarDate.endDate).add(1, 'day');
    return {
      baseDate: nextDate,
      startDate: nextDate,
      endDate: nextDate,
      mode: 'day',
    };
  };
  decreaseDateByMode = (calendarDate: DateState): DateState => {
    const prevDate = dayjs(calendarDate.endDate).subtract(1, 'day');
    return {
      baseDate: prevDate,
      startDate: prevDate,
      endDate: prevDate,
      mode: 'day',
    };
  };

  getTitle = (calendarDate: DateState): string => {
    const startDate = dayjs(calendarDate.startDate).format('MM월 DD일');
    const endDate = dayjs(calendarDate.endDate).format('MM월 DD일');

    return `${startDate} - ${endDate}`;
  };
}
