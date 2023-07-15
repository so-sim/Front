import { DateState } from '@/store/dateState';
import { padStart } from '@/utils/padStart';
import dayjs from 'dayjs';

export class WeekFilter {
  private mode: 'week' = 'week';

  getTitle = (calendarDate: DateState) => {
    const startMonth = padStart(dayjs(calendarDate.startDate).month() + 1);
    const startDate = padStart(dayjs(calendarDate.startDate).date());
    const endMonth = padStart(dayjs(calendarDate.endDate).month() + 1);
    const endDate = padStart(dayjs(calendarDate.endDate).date());

    return `${startMonth}월 ${startDate}일 - ${endMonth}월 ${endDate}일`;
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
    const startDayOfMonth = dayjs(calendarDate.baseDate).startOf('month');
    const startDay = dayjs(calendarDate.baseDate).startOf('week');
    const changedStartDate = startDay.date() > dayjs(calendarDate.baseDate).date() ? startDayOfMonth : startDay;
    const changedDate = changedStartDate.subtract(1, this.mode);

    const isSameMonth = changedDate.startOf('week').month() === changedDate.endOf('week').month();

    return {
      baseDate: isSameMonth ? changedDate.startOf('week') : changedDate,
      startDate: changedDate.startOf(this.mode),
      endDate: changedDate.endOf(this.mode),
      mode: this.mode,
    };
  };
}
