import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { DateFilterProperty } from './dateFilter';
import { RootDateFilter } from './rootDateFilter';

export class WeekFilter extends RootDateFilter {
  constructor(private week: number | null) {
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

  update = ({ day, week, ...rest }: DateFilterProperty, calendar: DateState) => {
    const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);

    return { ...rest, year, month, week: calendar.week, page: 0 };
  };

  increaseDate = (baseDate: Dayjs) => {
    const changedDate = this.changeMode(dayjs(baseDate).startOf('week').add(1, 'week'), 'week');

    return {
      baseDate: changedDate,
      week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
      selectedDate: null,
    };
  };

  decreaseDate = (baseDate: Dayjs) => {
    const changedDate = this.changeMode(dayjs(baseDate).startOf('week').subtract(1, 'week'), 'week');

    return {
      baseDate: changedDate,
      week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
      selectedDate: null,
    };
  };

  changeDateMode = (baseDate: Dayjs, newMode: FilterMode) => {
    const changedDate = this.changeMode(baseDate, newMode);
    return {
      baseDate: changedDate,
      week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
      selectedDate: null,
    };
  };
}
