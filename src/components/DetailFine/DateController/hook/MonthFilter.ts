import { DateState } from '@/store/dateState';
import { padStart } from '@/utils/padStart';
import dayjs from 'dayjs';

export class MonthFilter {
  private mode: 'month' = 'month';

  getTitle = (calendarDate: DateState) => {
    const month = padStart(dayjs(calendarDate.baseDate).month() + 1);
    return `${month}월`;
  };

  increaseDateByMode = (calendarDate: DateState) => {
    const startDate = dayjs(calendarDate.baseDate).startOf(this.mode).add(1, this.mode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate.endOf(this.mode),
      mode: this.mode,
    };
  };

  decreaseDateByMode = (calendarDate: DateState) => {
    const startDayOfMonth = dayjs(calendarDate.baseDate).startOf(this.mode).subtract(1, this.mode);
    return {
      baseDate: startDayOfMonth,
      startDate: startDayOfMonth.startOf(this.mode),
      endDate: startDayOfMonth.endOf(this.mode),
      mode: this.mode,
    };
  };
}
