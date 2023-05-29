import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { DetailFilter } from './dateFilter';
import { RootDateFilter } from './rootDateFilter';

export class WeekFilter extends RootDateFilter {
  private week: number | null;
  constructor(week: number | null) {
    super();
    this.week = week;
  }

  getTitle = (baseDate: Dayjs) => {
    if (this.week === 1) {
      const baseDateOnFirstWeek = dayjs(baseDate).startOf('week');
      const dateToMonthOnFirstWeek = this.padStart(baseDateOnFirstWeek.month() + 1);
      const dateToDayOnFirstWeek = this.padStart(baseDateOnFirstWeek.date());

      const lastDay = dayjs(baseDateOnFirstWeek).add(6, 'day');
      const lastDayToMonth = this.padStart(dayjs(lastDay).month() + 1);
      const lastDayToDay = this.padStart(dayjs(lastDay).date());

      return `${dateToMonthOnFirstWeek}월 ${dateToDayOnFirstWeek}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
    }

    const month = this.padStart(dayjs(baseDate).month() + 1);
    const day = this.padStart(dayjs(baseDate).date());

    const lastDay = dayjs(baseDate).add(6, 'day');
    const lastDayToMonth = this.padStart(dayjs(lastDay).month() + 1);
    const lastDayToDay = this.padStart(dayjs(lastDay).date());
    return `${month}월 ${day}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
  };

  update = ({ day, week, ...rest }: DetailFilter, calendar: DateState) => {
    const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);

    return { ...rest, year, month, week: calendar.week, page: 0 };
  };

  increaseDate = (baseDate: Dayjs) => {
    const changedDate = this.setStartDayByMode(dayjs(baseDate).startOf('week').add(1, 'week'), 'week');

    return this.getChangedDateState(changedDate);
  };

  decreaseDate = (baseDate: Dayjs) => {
    const changedDate = this.setStartDayByMode(dayjs(baseDate).startOf('week').subtract(1, 'week'), 'week');

    return this.getChangedDateState(changedDate);
  };

  protected getChangedDateState = (changedDate: Dayjs): DateState => ({
    baseDate: changedDate,
    week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
    selectedDate: null,
  });
}
